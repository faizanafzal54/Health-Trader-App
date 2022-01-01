import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginWithEmailAction,
  signInWithFacebookAction,
} from "../../actions/userActions";
import FacebookLogin from "react-facebook-login";
import { facebookAppId } from "../../configs/config";
import Checkbox from "@mui/material/Checkbox";
import LoginImg from "../../assets/signup-img.png";

function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmailHandler = async (e) => {
    e.preventDefault();
    dispatch(loginWithEmailAction(email, password));
  };

  const facebookResponse = async (response) => {
    dispatch(signInWithFacebookAction(response));
  };

  return (
    <div className="login">
      <form onSubmit={loginWithEmailHandler}>
        <div className="row gx-0 px-4 align-items-center vh-100">
          <div className="col-lg-6">
            <div>
              <h4>Welcome</h4>
            </div>
            <div className="welcome">
              <span>Log in by entering the information below.</span>
            </div>
            <div className="fields">
              <div className="app-field-div">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  required
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  name="email"
                  placeholder="email.address@example.com"
                />
              </div>
              <div className="app-field-div mt-20">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="********"
                />
              </div>
              <div className="d-flex remember-device flex-wrap justify-content-between">
                <div>
                  <Checkbox className="p-0" color="success" />
                  <label>Remember this device</label>
                </div>
                <NavLink className="btn btn-link" to="/forgotPassword">
                  Forgot Password?{" "}
                </NavLink>
              </div>

              <div className="d-grid">
                <button
                  disabled={email.length < 4 || password.length < 8}
                  type="submit"
                  className="btn btn-block btn-login"
                >
                  Login
                </button>
              </div>
              <div className="d-flex social-buttons">
                <FacebookLogin
                  textButton="Login with Facebook"
                  appId={facebookAppId}
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={facebookResponse}
                />
              </div>
              <div className="signup-text">
                <span>
                  Don't have an account?{" "}
                  <NavLink to="/signup">
                    <b>Create account</b>
                  </NavLink>
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <img src={LoginImg} alt="Logo" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
