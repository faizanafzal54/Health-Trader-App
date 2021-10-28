import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { forgotPasswordAction } from "../../actions/userActions";

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

  const forgotPasswordHandler = () => {
    dispatch(forgotPasswordAction(email));
  };
  return (
    <div>
      <div className="col-md-12">
        <div className="col-md-6 px-5 py-5">
          <h4>Health Trader</h4>
          <h2 className="mt-3">Reset your password</h2>
          <div className="col-md-7 mx-auto">
            <div className="mt-4 text-start">
              <label>
                Forgot your password? Enter the email address you usually use to
                login to Health Trader.
              </label>
              <input
                value={email}
                onChange={emailChangeHandler}
                className="form-control mt-5"
                name="email"
                placeholder="Enter your email address"
              />
              {emailError === "" ? (
                ""
              ) : (
                <span className={`text-danger font-12`}>{emailError}</span>
              )}
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                onClick={forgotPasswordHandler}
                disabled={emailError !== "" || email.length < 6}
                className="btn btn-primary"
              >
                Change my password
              </button>
            </div>
            <hr />
            <div className="text-start mt-5">
              <span>
                No account yet?
                <NavLink to="/signup">
                  <b>Create an account</b>
                </NavLink>
              </span>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
