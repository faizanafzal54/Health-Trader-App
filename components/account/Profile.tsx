import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deactivateAccountAction,
  profilePictureAction,
  removePictureAction,
  updateProfileAction,
} from "../../actions/userActions";
import { RootStore } from "../../store";
import { isUserLawyer } from "../services/roleService";
import { preSignedGetUrl } from "../services/s3Services";

interface State {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  displayName: string;
  role: number;
  image: string;
  file?: File | null;
}

function Profile() {
  const userState = useSelector((state: RootStore) => state?.user);
  const dispatch = useDispatch();

  const [state, setState] = useState<State>({
    displayName:
      userState.user.displayName === null
        ? userState.user.lastName + " " + userState.user.firstName
        : userState.user.displayName,
    firstName: userState.user.firstName,
    lastName: userState.user.lastName,
    phone: userState.user.phone,
    email: userState.user.email,
    role: isUserLawyer() ? 2 : 1,
    image: "null",
    file: null,
  });

  useEffect(() => {
    getProfilePicUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.user.image]);

  const getProfilePicUrl = async () => {
    if (userState.user.image === "" || userState.user.image === null) {
      inputChangeHandler("image", "");
      return false;
    }
    const url = await preSignedGetUrl(userState.user.image);
    inputChangeHandler("image", url);
  };

  const inputChangeHandler = (name: string, value: string | any) => {
    setState({
      ...state,
      [name]: value,
    });
  };
  const fileChangeHandler = (e: any) => {
    setState({
      ...state,
      file: e.target.files[0],
    });
    if (e.target.files[0] !== undefined) {
      dispatch(profilePictureAction(e.target.files[0], userState.user.id));
    } else {
      setState({
        ...state,
        file: null,
      });
    }
  };

  const removePictureHandler = () => {
    dispatch(removePictureAction(userState.user.id, userState.user.image));
  };

  const deactivateHandler = () => {
    dispatch(deactivateAccountAction(userState.user.id));
  };

  const saveProfileHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateProfileAction({
        id: userState.user.id,
        displayName: state.displayName,
        firstName: state.firstName,
        lastName: state.lastName,
        phone: state.phone,
        role: state.role,
      })
    );
  };

  return (
    <div className="text-start profile">
      <div className="d-flex align-items-end">
        <Avatar src={state.image} className="profile-avatar">
          N
        </Avatar>
        <div className="ps-3">
          <label className="btn btn-secondary" htmlFor="upload-photo">
            Upload
          </label>
          <input
            onChange={fileChangeHandler}
            type="file"
            name="photo"
            id="upload-photo"
          />
        </div>
        {userState.user.image === null ? (
          ""
        ) : (
          <div className="ps-3">
            <button
              onClick={removePictureHandler}
              className="btn btn-secondary"
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <form onSubmit={saveProfileHandler}>
        <div className="row pt-3">
          <div className="col-md-4">
            <label>Display name</label>
            <input
              name="displayName"
              onChange={(e) =>
                inputChangeHandler(e.target.name, e.target.value)
              }
              value={state.displayName}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label>First name</label>
            <input
              name="firstName"
              onChange={(e) =>
                inputChangeHandler(e.target.name, e.target.value)
              }
              value={state.firstName}
              className="form-control"
            />
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-md-4">
            <label>Last name</label>
            <input
              name="lastName"
              onChange={(e) =>
                inputChangeHandler(e.target.name, e.target.value)
              }
              value={state.lastName}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label>Role on this project</label>
            <input
              readOnly
              name="role"
              value={state.role === 1 ? "General User" : "Lawyer"}
              className="form-control"
            />
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-md-4">
            <label>Email</label>
            <input value={state.email} disabled className="form-control" />
          </div>
          <div className="col-md-4">
            <label>Phone</label>
            <input
              name="phone"
              onChange={(e) =>
                inputChangeHandler(e.target.name, e.target.value)
              }
              value={state.phone}
              className="form-control"
            />
          </div>
        </div>
        <div className="pt-5 row justify-content-between">
          <div className="col-md-4">
            <button type="submit" className="btn btn-warning">
              Save changes
            </button>
          </div>
          <div className="col-md-7">
            <div className="d-flex">
              <span className="font-12">
                <b>Delete account</b>
                <br />
                by deleting your account you will lose all your data
              </span>
              <button
                type="button"
                onClick={deactivateHandler}
                className="btn btn-secondary ms-2"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
