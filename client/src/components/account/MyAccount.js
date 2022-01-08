import React, { useEffect } from "react";
import { useState } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import history from "../../helpers/history";
import { getProfile } from "./accountService";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "../../actions/userActions";

function MyAccount(props) {
  const userId = useSelector((state) => state.user.user._id);
  const dispatch = useDispatch();

  const [profileState, setProfileState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    dateOfBirth: null,
    password: "",
    password2: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContacts: [{ firstName: "", lastName: "", role: "", email: "" }],
  });

  useEffect(() => {
    getProfleHandler();
  }, []);

  const getProfleHandler = async () => {
    try {
      const res = await getProfile(userId);
      if (res.status === 200) {
        if (res.data.data.user) {
          setProfileState({
            firstName: res.data.data.user.firstName,
            middleName: "",
            lastName: res.data.data.user.lastName,
            gender: res.data.data.user.gender ?? "",
            phone: res.data.data.user.phone,
            email: res.data.data.user.email,
            dateOfBirth: res.data.data.user.dateOfBirth
              ? new Date(res.data.data.user.dateOfBirth)
              : null,
            password: "",
            password2: "",
            address: res.data.data.user.address,
            address2: "",
            city: res.data.data.user.city ?? "",
            state: res.data.data.user.state ?? "",
            zipCode: res.data.data.user.zipCode ?? "",
            emergencyContacts: [
              { firstName: "", lastName: "", role: "", email: "" },
            ],
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const profileStateHandler = (e) => {
    setProfileState({
      ...profileState,
      [e.target.name]: e.target.value,
    });
  };
  const dateStateHandler = (date) => {
    setProfileState({
      ...profileState,
      dateOfBirth: date,
    });
  };

  const emergencyContactHandler = (e, index) => {
    let newContacts = profileState.emergencyContacts;
    newContacts[index][e.target.name] = e.target.value;
    setProfileState({
      ...profileState,
      emergencyContacts: newContacts,
    });
  };

  const addEmergencyContact = () => {
    let newContacts = profileState.emergencyContacts;
    newContacts.push({ firstName: "", lastName: "", role: "", email: "" });
    setProfileState({
      ...profileState,
      emergencyContacts: newContacts,
    });
  };

  const saveHandler = async () => {
    if (
      profileState.firstName.length === 0 ||
      profileState.lastName.length === 0 ||
      profileState.email.length === 0 ||
      profileState.phone === ""
    ) {
      return false;
    }
    try {
      dispatch(
        updateProfileAction({
          userId,
          ...profileState,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="text-start account">
      <div className="card register mx-auto">
        <div className="title">
          <h5>Profile</h5>
        </div>
        <div className="info fields">
          <div className="basic-info">
            <h5>Login Information</h5>
          </div>

          <div className="row">
            <div className="col-md-12 pt-05">
              <div className="app-field-div">
                <label htmlFor="email">
                  Contact's Email<span className="text-danger">*</span>
                </label>
                <input
                  // onChange={(e) => profileStateHandler(e)}
                  value={profileState.email}
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="col-md-6 pt-10">
              <div className="app-field-div">
                <label htmlFor="password">Password</label>
                <input
                  onChange={(e) => profileStateHandler(e)}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6 pt-10">
              <div className="app-field-div">
                <label htmlFor="password2">Confirm password</label>
                <input
                  type="password"
                  onChange={(e) => profileStateHandler(e)}
                  id="password2"
                  name="password2"
                  placeholder="Confirm password"
                  className="form-control"
                />
              </div>
            </div>
            {profileState.password === profileState.password2 &&
            profileState.password.length > 7 ? (
              ""
            ) : profileState.password.length < 8 &&
              profileState.password.length !== 0 ? (
              <span className={`text-danger font-12`}>
                Password must have atleast 8 characters
              </span>
            ) : profileState.password !== profileState.password2 &&
              profileState.password2.length !== 0 ? (
              <span className={`text-danger font-12`}>
                Password & confirm password should match
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="basic-info pt-20">
            <h5>Personal Information</h5>
          </div>
          <div className="row">
            <div className="col-md-4 pt-05">
              <div className="app-field-div">
                <label htmlFor="firstName">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  onChange={(e) => profileStateHandler(e)}
                  name="firstName"
                  id="firstName"
                  className="form-control"
                  value={profileState.firstName}
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="col-md-4 pt-05">
              <div className="app-field-div">
                <label htmlFor="middleName">
                  Middle Name <span className="text-danger">*</span>
                </label>
                <input
                  onChange={(e) => profileStateHandler(e)}
                  name="middleName"
                  id="middleName"
                  value={profileState.middleName}
                  className="form-control"
                  placeholder="Middle Name"
                />
              </div>
            </div>
            <div className="col-md-4 pt-05">
              <div className="app-field-div">
                <label htmlFor="lastName">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  onChange={(e) => profileStateHandler(e)}
                  value={profileState.lastName}
                  name="lastName"
                  id="lastName"
                  className="form-control"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="col-md-4 pt-10">
              <div className="app-field-div">
                <label htmlFor="dob">
                  Date of birth<span className="text-danger">*</span>
                </label>
                <DatePicker
                  id="dob"
                  className="form-control"
                  placeholderText="MM/DD/YYYY"
                  selected={profileState.dateOfBirth}
                  onChange={(date) => dateStateHandler(date)}
                />
              </div>
            </div>
            <div className="col-md-4 pt-10">
              <div className="app-field-div">
                <label htmlFor="gender">Gender</label>
                <select
                  onChange={(e) => profileStateHandler(e)}
                  id="gender"
                  name="gender"
                  value={profileState.gender}
                  className="form-select"
                  placeholder=""
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            <div className="col-md-4 pt-10">
              <div className="app-field-div">
                <label htmlFor="phone">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  onChange={(e) => profileStateHandler(e)}
                  value={profileState.phone}
                  name="phone"
                  id="phone"
                  className="form-control"
                  placeholder="(000) - 000 - 0000"
                />
              </div>
            </div>
            <div className="col-md-12 pt-10 profile-picture-upload">
              <div className="d-flex">
                <button>
                  Upload <FontAwesomeIcon icon={faUpload} />{" "}
                </button>
                <div>
                  <div className="upload-title">
                    <span>Profile Picture</span>
                  </div>
                  <div>
                    <span className="type">
                      (.jpg, .png, whatever files are accepted)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 pt-10">
              <div className="app-field-div">
                <label htmlFor="address">
                  Address Line 1 <span className="text-danger">*</span>
                </label>
                <input
                  onChange={(e) => profileStateHandler(e)}
                  name="address"
                  id="address"
                  value={profileState.address}
                  className="form-control"
                  placeholder="Address"
                />
              </div>
            </div>
            <div className="col-md-6 pt-10">
              <div className="app-field-div">
                <label htmlFor="address2">
                  Address Line 2 <span className="text-danger">*</span>
                </label>
                <input
                  onChange={(e) => profileStateHandler(e)}
                  name="address2"
                  id="address2"
                  value={profileState.address2}
                  className="form-control"
                  placeholder="Address"
                />
              </div>
            </div>
            <div className="col-md-4 pt-10">
              <div className="app-field-div">
                <label htmlFor="city">
                  City<span className="text-danger">*</span>
                </label>
                <input
                  onChange={(e) => profileStateHandler(e)}
                  name="city"
                  id="city"
                  value={profileState.city}
                  className="form-control"
                  placeholder="City"
                />
              </div>
            </div>
            <div className="col-md-4 pt-10">
              <div className="app-field-div">
                <label htmlFor="state">
                  State<span className="text-danger">*</span>
                </label>
                <input
                  onChange={(e) => profileStateHandler(e)}
                  name="state"
                  id="state"
                  value={profileState.state}
                  className="form-control"
                  placeholder="State"
                />
              </div>
            </div>
            <div className="col-md-4 pt-10">
              <div className="app-field-div">
                <label htmlFor="zipCode">
                  Zip code<span className="text-danger">*</span>
                </label>
                <input
                  onChange={(e) => profileStateHandler(e)}
                  name="zipCode"
                  id="zipCode"
                  value={profileState.zipCode}
                  className="form-control"
                  placeholder="Zip code"
                />
              </div>
            </div>
          </div>
          <div className="basic-info pt-20">
            <h5>Emergency Contact (EC) Information</h5>
          </div>
          {profileState.emergencyContacts.map((contact, index) => (
            <div className={index === 0 ? "row" : "row mt-10"} key={index}>
              <div className="col-md-4 pt-05">
                <div className="app-field-div">
                  <label htmlFor={`${index}ecfname`}>
                    EC First Name<span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={(e) => emergencyContactHandler(e, index)}
                    id={`${index}ecfname`}
                    value={contact.firstName}
                    name="firstName"
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
              </div>
              <div className="col-md-4 pt-05">
                <div className="app-field-div">
                  <label>
                    EC Last Name<span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={(e) => emergencyContactHandler(e, index)}
                    value={contact.lastName}
                    name="lastName"
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="col-md-4 pt-05">
                <div className="app-field-div">
                  <label>
                    EC Role<span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={(e) => emergencyContactHandler(e, index)}
                    value={contact.role}
                    name="role"
                    className="form-control"
                    placeholder="Role"
                  />
                </div>
              </div>
              <div className="col-md-12 pt-10">
                <div className="app-field-div">
                  <label>
                    Email<span className="text-danger">*</span>
                  </label>
                  <input
                    value={contact.email}
                    onChange={(e) => emergencyContactHandler(e, index)}
                    name="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="add-emergency-contact">
            <button
              onClick={addEmergencyContact}
              className="btn add-emergency-contact"
            >
              Add Another Emergency Contact
            </button>
          </div>
          <div className="notification-settings">
            <div className="d-flex actions mt-20">
              <button className="cancel-button">Cancel</button>
              <button
                disabled={
                  profileState.firstName.length === 0 ||
                  profileState.lastName.length === 0 ||
                  profileState.email.length === 0 ||
                  profileState.phone === ""
                }
                onClick={() => saveHandler()}
                className="save-button ml-30"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
