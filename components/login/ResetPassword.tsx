import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { verifyResetLinkAction } from "../../actions/userActions";

interface DefaultProps {
  match: {
    params: { link: string };
  };
}

function ResetPassword(props: DefaultProps) {
  const dispatch = useDispatch();

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [resetLink, setResetLink] = useState("");

  const changePassword2 = (_password2: any) => {
    setPassword2(_password2);
  };

  useEffect(() => {
    setResetLink(props?.match?.params?.link);
    dispatch(verifyResetLinkAction(props?.match?.params?.link));
  }, []);

  return (
    <div>
      <div className="col-md-12">
        <div className="col-md-6 px-5 py-5">
          <h4>TWN Logo</h4>
          <h2 className="mt-3">Reset your password</h2>
          <div className="col-md-7 mx-auto">
            <div className="mt-4 text-start">
              <label>Enter password</label>
              <input
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                className="form-control mt-2"
                name="password1"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mt-4 text-start">
              <label>Confrim password</label>
              <input
                value={password2}
                onChange={(e) => changePassword2(e.target.value)}
                className="form-control mt-2"
                name="password2"
                placeholder="Enter your email address"
              />
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-primary">Reset password</button>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
