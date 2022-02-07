import React, { useEffect } from "react";
import { useState } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { completeRegistration, verifyInviteLink } from "./loginService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import history from "../../helpers/history";

function RegisterForm(props) {
  const [inviteLink, setinviteLink] = useState("");
  const [inviteState, setInviteState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    dateOfBirth: null,
    password: "",
    password2: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContacts: [{ firstName: "", lastName: "", role: "", email: "" }],
  });

  useEffect(() => {
    setinviteLink(props?.match?.params?.link);
    verifyLinkHandler(props?.match?.params?.link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyLinkHandler = async (link) => {
    try {
      const res = await verifyInviteLink(link);
      if (res.status === 200) {
        setInviteState({
          ...inviteState,
          firstName: res.data.data.firstName,
          email: res.data.data.email,
          lastName: res.data.data.lastName,
          phone: res.data.data.phone,
        });
      }
      console.log(inviteLink);
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  const inviteStateHandler = (e) => {
    setInviteState({
      ...inviteState,
      [e.target.name]: e.target.value,
    });
  };
  const dateStateHandler = (date) => {
    setInviteState({
      ...inviteState,
      dateOfBirth: date,
    });
  };

  const emergencyContactHandler = (e, index) => {
    let newContacts = inviteState.emergencyContacts;
    newContacts[index][e.target.name] = e.target.value;
    setInviteState({
      ...inviteState,
      emergencyContacts: newContacts,
    });
  };

  const addEmergencyContact = () => {
    let newContacts = inviteState.emergencyContacts;
    newContacts.push({ firstName: "", lastName: "", role: "", email: "" });
    setInviteState({
      ...inviteState,
      emergencyContacts: newContacts,
    });
  };

  const saveHandler = async () => {
    if (
      inviteState.firstName.length === 0 ||
      inviteState.lastName.length === 0 ||
      inviteState.email.length === 0 ||
      inviteState.phone === "" ||
      inviteState.password !== inviteState.password2
    ) {
      return false;
    }
    try {
      const res = await completeRegistration({
        inviteLink,
        ...inviteState,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      console.log(res);
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="text-start">
      <div className="card register mx-auto">
        <div className="title">
          <h5>Complete Registration</h5>
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
                  // onChange={(e) => inviteStateHandler(e)}
                  value={inviteState.email}
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
                  onChange={(e) => inviteStateHandler(e)}
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
                  onChange={(e) => inviteStateHandler(e)}
                  id="password2"
                  name="password2"
                  placeholder="Confirm password"
                  className="form-control"
                />
              </div>
            </div>
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
                  onChange={(e) => inviteStateHandler(e)}
                  name="firstName"
                  id="firstName"
                  className="form-control"
                  value={inviteState.firstName}
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="col-md-4 pt-05">
              <div className="app-field-div">
                <label htmlFor="middleName">Middle Name</label>
                <input
                  onChange={(e) => inviteStateHandler(e)}
                  name="middleName"
                  id="middleName"
                  value={inviteState.middleName}
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
                  onChange={(e) => inviteStateHandler(e)}
                  value={inviteState.lastName}
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
                  selected={inviteState.dateOfBirth}
                  onChange={(date) => dateStateHandler(date)}
                />
              </div>
            </div>
            <div className="col-md-4 pt-10">
              <div className="app-field-div">
                <label htmlFor="gender">Gender</label>
                <select
                  onChange={(e) => inviteStateHandler(e)}
                  id="gender"
                  name="gender"
                  value={inviteState.gender}
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
                  onChange={(e) => inviteStateHandler(e)}
                  value={inviteState.phone}
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
                <label htmlFor="address1">
                  Address Line 1 <span className="text-danger">*</span>
                </label>
                <input
                  onChange={(e) => inviteStateHandler(e)}
                  name="address1"
                  id="address1"
                  value={inviteState.address1}
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
                  onChange={(e) => inviteStateHandler(e)}
                  name="address2"
                  id="address2"
                  value={inviteState.address2}
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
                  onChange={(e) => inviteStateHandler(e)}
                  name="city"
                  id="city"
                  value={inviteState.city}
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
                  onChange={(e) => inviteStateHandler(e)}
                  name="state"
                  id="state"
                  value={inviteState.state}
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
                  onChange={(e) => inviteStateHandler(e)}
                  name="zipCode"
                  id="zipCode"
                  value={inviteState.zipCode}
                  className="form-control"
                  placeholder="Zip code"
                />
              </div>
            </div>
          </div>
          <div className="basic-info pt-20">
            <h5>Emergency Contact (EC) Information</h5>
          </div>
          {inviteState.emergencyContacts.map((contact, index) => (
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
                  inviteState.firstName.length === 0 ||
                  inviteState.lastName.length === 0 ||
                  inviteState.email.length === 0 ||
                  inviteState.phone === "" ||
                  inviteState.password.length < 8 ||
                  inviteState.password !== inviteState.password2
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

export default RegisterForm;
