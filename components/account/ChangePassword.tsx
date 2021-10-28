import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toastify } from "../../actions/userActions";
import { RootStore } from "../../store";
import { changePassword } from "./accountService";

type PasswordProps = {
  setValue: (value: number) => void;
};

function ChangePassword(props: PasswordProps) {
  const userState = useSelector((state: RootStore) => state?.user);

  const [oldPassword, setOld] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const changePasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await changePassword(
        userState.user.id,
        oldPassword,
        password1
      );
      if (res.status === 200) {
        toastify("success", "Your password has been changed successfully");
        props.setValue(0);
      }
    } catch (err) {}
  };
  return (
    <div className="change-password text-start">
      <form onSubmit={changePasswordHandler}>
        <div className="col-md-4">
          <label>
            Old password <span className="text-danger">*</span>
          </label>
          <input
            required
            type="password"
            onChange={(e) => setOld(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4 pt-4">
          <label>
            New password <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            onChange={(e) => setPassword1(e.target.value)}
            className="form-control"
          />
          {oldPassword === password1 && password1.length !== 0 ? (
            <span className="text-danger font-12">
              New and old password can not be same
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-4 pt-4">
          <label>
            Confirm password <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            onChange={(e) => setPassword2(e.target.value)}
            className="form-control"
          />
          {password1 === password2 && password1.length > 7 ? (
            ""
          ) : password1.length < 8 && password1.length !== 0 ? (
            <span className={`text-danger font-12`}>
              Password must have atleast 8 characters
            </span>
          ) : password1 !== password2 && password2.length !== 0 ? (
            <span className={`text-danger font-12`}>Password must match</span>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-4 d-grid pt-4">
          <button
            disabled={
              password1 !== password2 ||
              password1.length < 8 ||
              oldPassword === password1
            }
            className="btn btn-block btn-primary"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
