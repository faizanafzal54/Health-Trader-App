import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginWithEmailAction } from "../../actions/userActions";

function Login(props: any) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmailHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginWithEmailAction(email, password));
  };

  return (
    <div>
      <div className="col-md-12">
        <div className="col-md-6 offset-md-6 px-5 py-5">
          <h4>Heirshare Logo</h4>
          <div className="col-md-7 mx-auto">
            <form onSubmit={loginWithEmailHandler}>
              <div className="mt-4 text-start">
                <input
                  required
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  name="email"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="mt-4 text-start">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="text-end mt-2">
                <NavLink className="btn btn-link" to="/forgotPassword">
                  Forgot Password
                </NavLink>
              </div>
              <div className="d-grid pt-2">
                <button
                  disabled={email.length < 4 || password.length < 8}
                  type="submit"
                  className="btn btn-block btn-primary"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="pt-5">
              <span>
                Don't have an account?{" "}
                <NavLink to="/signup">
                  <b>Sign up</b>
                </NavLink>
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
}

export default Login;
