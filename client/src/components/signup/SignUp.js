import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupAction } from "../../actions/userActions";
import { NavLink } from "react-router-dom";
import LoginImg from "../../assets/signup-img.png";

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
    <div className="login">
      <div className="row align-items-center vh-100">
        <div className="col-md-6">
          <div>
            <h4>Welcome</h4>
          </div>
          <div className="welcome">
            <span>Enter the information below to get started.</span>
          </div>
          <div className="fields">
            <div className="app-field-div">
              <label htmlFor="signup-email">
                Email<span className="text-danger">*</span>
              </label>
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
                <span className={`text-danger font-12`}>{emailError}</span>
              )}
            </div>
            <div className="app-field-div mt-20">
              <label htmlFor="password">
                Password<span className="text-danger">*</span>
              </label>
              <input
                id="password"
                type="password"
                value={state.password1}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
                className="form-control"
                name="password1"
                placeholder="Password"
              />
            </div>
            <div className="app-field-div mt-20">
              <label htmlFor="password2">
                Confirm Password<span className="text-danger">*</span>
              </label>
              <input
                id="password2"
                type="password"
                value={state.password2}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
                className="form-control"
                name="password2"
                placeholder="Confirm password"
              />
            </div>
            {state.password1 === state.password2 &&
            state.password1.length > 7 ? (
              ""
            ) : state.password1.length < 8 && state.password1.length !== 0 ? (
              <span className={`text-danger font-12`}>
                Password must have atleast 8 characters
              </span>
            ) : state.password1 !== state.password2 &&
              state.password2.length !== 0 ? (
              <span className={`text-danger font-12`}>
                Password & confirm password should match
              </span>
            ) : (
              ""
            )}
            {/* <div className="d-flex remember-device flex-wrap justify-content-between">
              <div>
                <Checkbox className="p-0" color="success" />
                <label>Remember this device</label>
              </div>
              <NavLink className="btn btn-link" to="/forgotPassword">
                Forgot Password?{" "}
              </NavLink>
            </div> */}

            <div className="d-grid">
              <button
                disabled={
                  state.password1 !== state.password2 ||
                  emailError !== "" ||
                  state.email.length === 0 ||
                  state.password1.length < 8
                }
                onClick={signpHandler}
                type="submit"
                className="btn btn-block btn-login"
              >
                Continue
              </button>
            </div>
            <div className="d-flex social-buttons">
              {/* <FacebookLogin
                textButton="Login with Facebook"
                appId={facebookAppId}
                autoLoad={false}
                fields="name,email,picture"
                callback={facebookResponse}
              /> */}
            </div>
            <div className="signup-text">
              <span>
                Already have an account?{" "}
                <NavLink to="/login">
                  <b>Log in here</b>
                </NavLink>
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img src={LoginImg} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
