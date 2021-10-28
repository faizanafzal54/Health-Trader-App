import React, { Suspense, useState } from "react";
import { useDispatch } from "react-redux";
import { signupAction } from "../../actions/userActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from "@mui/material/Checkbox";

const SignUp = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password1: "",
    password2: "",
    isAcknowledged: false,
    dateOfBirth: null,
    emergencyPhone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  const [emailError, setEmailError] = useState("");

  const onInputChange = (name, value) => {
    if (name === "phone") {
      if (typeof value === "string" && value.length < 16) {
        setState({ ...state, [name]: value });
      }
    } else {
      setState({ ...state, [name]: value });
    }
  };
  const emailChangeHandler = (name, value) => {
    if (!value.match(/^\S+@\S+$/)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
    onInputChange(name, value);
  };
  const signpHandler = () => {
    let obj = {
      firstName: state.firstName,
      middleName: state.middleName,
      lastName: state.lastName,
      phone: state.phone,
      email: state.email,
      password: state.password1,
      dateOfBirth: state.dateOfBirth,
      emergencyPhone: state.emergencyPhone,
      address: state.address,
      city: state.city,
      state: state.state,
      country: state.country,
      zip: state.zip,
      role: 1,
    };
    dispatch(signupAction(obj));
  };

  return (
    <div>
      <div className="col-md-12">
        <div className="col-md-6 offset-md-6 py-5">
          <div className="px-5 text-start">
            <div className="col-md-8">
              <div className="text-center">
                <h3>Sign up</h3>
              </div>
              <Suspense fallback={<div></div>}>
                <div className="col-sm-9 col-md-7 col-lg-12 mx-auto">
                  <div className="row">
                    <div className="pt-4 col-md-6">
                      <input
                        onChange={(e) =>
                          onInputChange(e.target.name, e.target.value)
                        }
                        value={state.firstName}
                        className="form-control"
                        name="firstName"
                        placeholder="First name"
                      />
                    </div>
                    <div className="pt-4 col-md-6">
                      <input
                        onChange={(e) =>
                          onInputChange(e.target.name, e.target.value)
                        }
                        value={state.middleName}
                        className="form-control"
                        name="middleName"
                        placeholder="Middle name"
                      />
                    </div>
                    <div className="pt-4 col-md-6">
                      <input
                        onChange={(e) =>
                          onInputChange(e.target.name, e.target.value)
                        }
                        value={state.lastName}
                        className="form-control"
                        name="lastName"
                        placeholder="Last name"
                      />
                    </div>
                    <div className="pt-4 col-md-6">
                      <input
                        id="signup-email"
                        value={state.email}
                        onChange={(e) =>
                          emailChangeHandler(e.target.name, e.target.value)
                        }
                        className="form-control"
                        name="email"
                        placeholder="Email address"
                      />
                      {emailError === "" ? (
                        ""
                      ) : (
                        <span className={`text-danger font-12`}>
                          {emailError}
                        </span>
                      )}
                    </div>
                    <div className="pt-4 col-md-6">
                      <input
                        onChange={(e) =>
                          onInputChange(e.target.name, e.target.value)
                        }
                        value={state.phone}
                        type="number"
                        min="0"
                        className="form-control"
                        name="phone"
                        placeholder="Phone number"
                      />
                    </div>
                    <div className="pt-4 col-md-6">
                      <DatePicker
                        className="form-control"
                        placeholderText="Date of birth"
                        selected={state.dateOfBirth}
                        onChange={(date) => onInputChange("dateOfBirth", date)}
                      />
                    </div>
                    <div className="pt-4 col-md-6">
                      <input
                        onChange={(e) =>
                          onInputChange(e.target.name, e.target.value)
                        }
                        value={state.emergencyPhone}
                        type="number"
                        min="0"
                        className="form-control"
                        name="emergencyPhone"
                        placeholder="Emergency contact"
                      />
                    </div>
                    <div className="pt-4 col-md-6">
                      <input
                        onChange={(e) =>
                          onInputChange(e.target.name, e.target.value)
                        }
                        value={state.address}
                        className="form-control"
                        name="address"
                        placeholder="Address"
                      />
                    </div>
                    <div className="pt-4 col-md-6">
                      <input
                        onChange={(e) =>
                          onInputChange(e.target.name, e.target.value)
                        }
                        value={state.city}
                        className="form-control"
                        name="city"
                        placeholder="City"
                      />
                    </div>
                    <div className="pt-4 col-md-6">
                      <input
                        onChange={(e) =>
                          onInputChange(e.target.name, e.target.value)
                        }
                        value={state.state}
                        className="form-control"
                        name="state"
                        placeholder="State"
                      />
                    </div>
                    <div className="pt-4 col-md-6">
                      <input
                        onChange={(e) =>
                          onInputChange(e.target.name, e.target.value)
                        }
                        value={state.country}
                        className="form-control"
                        name="country"
                        placeholder="Country"
                      />
                    </div>
                    <div className="pt-4 col-md-6">
                      <input
                        onChange={(e) =>
                          onInputChange(e.target.name, e.target.value)
                        }
                        value={state.zip}
                        className="form-control"
                        name="zip"
                        placeholder="Zip"
                      />
                    </div>
                    <div className="pt-4 col-md-6">
                      <input
                        type="password"
                        value={state.password1}
                        onChange={(e) =>
                          onInputChange(e.target.name, e.target.value)
                        }
                        className="form-control"
                        name="password1"
                        placeholder="Password"
                      />
                    </div>
                    <div className="pt-4 col-md-6">
                      <input
                        type="password"
                        value={state.password2}
                        onChange={(e) =>
                          onInputChange(e.target.name, e.target.value)
                        }
                        className="form-control"
                        name="password2"
                        placeholder="Confirm password"
                      />
                      {state.password1 === state.password2 &&
                      state.password1.length > 7 ? (
                        ""
                      ) : state.password1.length < 8 &&
                        state.password1.length !== 0 ? (
                        <span className={`text-danger font-12`}>
                          Password must have atleast 8 characters
                        </span>
                      ) : state.password1 !== state.password2 &&
                        state.password2.length !== 0 ? (
                        <span className={`text-danger font-12`}>
                          Password must match
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="pt-4">
                    <Checkbox
                      onChange={(e) =>
                        onInputChange("isAcknowledged", e.target.checked)
                      }
                      className="ps-0"
                      color="primary"
                    />
                    <label>I acknowledge the privacy</label>
                  </div>
                  <div className="d-grid pt-4">
                    <button
                      disabled={
                        state.password1 !== state.password2 ||
                        emailError !== "" ||
                        state.email.length === 0 ||
                        state.password1.length < 8 ||
                        !state.isAcknowledged ||
                        state.firstName.length < 3 ||
                        state.lastName.length < 3
                      }
                      onClick={signpHandler}
                      type="submit"
                      className="btn btn-block btn-primary"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </Suspense>
            </div>
          </div>
        </div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
};

export default SignUp;
