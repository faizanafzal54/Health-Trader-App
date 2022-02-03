import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPasswordAction } from "../../actions/userActions";
import LoginImg from "../../assets/signup-img.png";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAction(email));
  };
  return (
    <div className="login">
      <form onSubmit={forgotPasswordHandler}>
        <div className="row align-items-center vh-100">
          <div className="col-md-6">
            <div>
              <h4>Reset Password</h4>
            </div>
            <div className="welcome">
              <span>Enter the email address you usually use to login</span>
            </div>
            <div className="fields">
              <div className="app-field-div">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={emailChangeHandler}
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="email.address@example.com"
                />
                {emailError === "" ? (
                  ""
                ) : (
                  <span className={`text-danger font-12`}>{emailError}</span>
                )}
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  disabled={emailError !== "" || email.length < 6}
                  className="btn btn-block btn-login"
                >
                  Change my password
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <img src={LoginImg} alt="Logo" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;


