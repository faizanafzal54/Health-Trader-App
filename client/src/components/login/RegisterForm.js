import React, { useEffect } from "react";
import { useState } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { verifyInviteLink } from "./loginService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RegisterForm(props) {
  const [inviteLink, setinviteLink] = useState("");
  const [inviteState, setInviteState] = useState({
    firstName: "",
    lastName: "",
    circle: "",
    notes: "",
    phone: "",
    email: "",
    dateOfBirth: null,
    emergencyContact: [{ firstName: "", lastName: "", role: "", email: "" }],
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

  const saveHandler = async () => {
    if (
      inviteState.firstName.length === 0 ||
      inviteState.lastName.length === 0 ||
      inviteState.email.length === 0 ||
      inviteState.circle === "" ||
      inviteState.phone === ""
    ) {
      return false;
    }
    try {
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-4 text-start">
      <div className="card modal-new-person mx-auto">
        <div className="title">
          <h5>Complete Registration</h5>
        </div>
        <div className="info fields">
          <div className="basic-info">
            <h5>Login Information</h5>
          </div>

          <div className="row">
            <div className="col-md-12">
              <label>
                Contact's Email<span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                name="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="col-md-6 pt-10">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
            <div className="col-md-6 pt-10">
              <input
                type="password"
                placeholder="Confirm password"
                className="form-control"
              />
            </div>
          </div>
          <div className="basic-info pt-20">
            <h5>Personal Information</h5>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label>
                First Name <span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                name="firstName"
                className="form-control"
                value={inviteState.firstName}
                placeholder="First Name"
              />
            </div>
            <div className="col-md-4">
              <label>
                Middle Name <span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                name="firstName"
                className="form-control"
                placeholder="Middle Name"
              />
            </div>
            <div className="col-md-4">
              <label>
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                value={inviteState.lastName}
                name="lastName"
                className="form-control"
                placeholder="Last Name"
              />
            </div>
            <div className="col-md-4 pt-10">
              <label>
                Date of birth<span className="text-danger">*</span>
              </label>
              <DatePicker
                className="form-control"
                placeholderText="MM/DD/YYYY"
                selected={inviteState.dateOfBirth}
                onChange={(date) => dateStateHandler(date)}
              />
            </div>
            <div className="col-md-4 pt-10">
              <label>Gender</label>
              <select
                onChange={(e) => inviteStateHandler(e)}
                name="circle"
                className="form-select"
                placeholder=""
              >
                <option value=""></option>
                <option value="Month">Month</option>
              </select>
            </div>
            <div className="col-md-4 pt-10">
              <label>
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                value={inviteState.phone}
                name="phone"
                className="form-control"
                placeholder="(000) - 000 - 0000"
              />
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
              <label>
                Address Line 1 <span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                name="address"
                className="form-control"
                placeholder="Address"
              />
            </div>
            <div className="col-md-6 pt-10">
              <label>
                Address Line 2 <span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                name="address"
                className="form-control"
                placeholder="Address"
              />
            </div>
            <div className="col-md-4 pt-10">
              <label>
                City<span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                name="city"
                className="form-control"
                placeholder="City"
              />
            </div>
            <div className="col-md-4 pt-10">
              <label>
                State<span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                name="state"
                className="form-control"
                placeholder="State"
              />
            </div>
            <div className="col-md-4 pt-10">
              <label>
                Zip code<span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                name="zipcode"
                className="form-control"
                placeholder="Zip code"
              />
            </div>
          </div>
          <div className="basic-info pt-20">
            <h5>Emergency Contact (EC) Information</h5>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label>
                EC First Name<span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                name="esfirstName"
                className="form-control"
                placeholder="First name"
              />
            </div>
            <div className="col-md-4">
              <label>
                EC Last Name<span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                name="eclastname"
                className="form-control"
                placeholder="Last name"
              />
            </div>
            <div className="col-md-4">
              <label>
                EC Role<span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                name="ecrole"
                className="form-control"
                placeholder="Role"
              />
            </div>
            <div className="col-md-12">
              <label>
                Email<span className="text-danger">*</span>
              </label>
              <input
                onChange={(e) => inviteStateHandler(e)}
                name="email"
                className="form-control"
                placeholder="Relationship"
              />
            </div>
          </div>
          <div className="notification-settings">
            <div className="d-flex actions mt-20">
              <button className="cancel-button">Cancel</button>
              <button
                disabled={
                  inviteState.firstName.length === 0 ||
                  inviteState.lastName.length === 0 ||
                  inviteState.email.length === 0 ||
                  inviteState.circle === "" ||
                  inviteState.phone === ""
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
