import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  resetPasswordAction,
  verifyResetLinkAction,
} from "../../actions/userActions";

function ResetPassword(props) {
  const dispatch = useDispatch();

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [resetLink, setResetLink] = useState("");

  const changePassword2 = (_password2) => {
    setPassword2(_password2);
  };

  useEffect(() => {
    setResetLink(props?.match?.params?.link);
    dispatch(verifyResetLinkAction(props?.match?.params?.link));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetPasswordHandler = async () => {
    if (password1 !== password2 || password1.length < 8) {
      return;
    }
    dispatch(resetPasswordAction(resetLink, password1));
  };

  return (
    <div>
      <div className="col-md-12">
        <div className="col-md-6 px-5 py-5">
          <h4>Health Trader</h4>
          <h2 className="mt-3">Reset your password</h2>
          <div className="col-md-7 mx-auto">
            <div className="mt-4 text-start">
              <label>Enter password</label>
              <input
                value={password1}
                placeholder="Enter new password"
                onChange={(e) => setPassword1(e.target.value)}
                className="form-control mt-2"
                name="password1"
                type="password"
              />
            </div>
            <div className="mt-4 text-start">
              <label>Confrim password</label>
              <input
                value={password2}
                placeholder="Confirm password"
                onChange={(e) => changePassword2(e.target.value)}
                className="form-control mt-2"
                name="password2"
                type="password"
              />
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                disabled={password1 !== password2 || password1.length < 8}
                onClick={resetPasswordHandler}
                className="btn btn-primary"
              >
                Reset password
              </button>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
