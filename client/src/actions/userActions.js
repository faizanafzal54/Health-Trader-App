import {
  forgotPassword,
  resetPassword,
  signInWithEmail,
  signInWithFacebook,
  verifyResetPasswordLink,
} from "../components/login/loginService.js";
import { signupThroughEmail } from "../components/signup/signupService.js";
import history from "../helpers/history.js";
import { toast } from "react-toastify";

export const toastify = (type, toastMessage) => {
  switch (type) {
    case "success":
      toast.success(toastMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case "error":
      toast.error(toastMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case "warning":
      toast.warn(toastMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;

    default:
      break;
  }
};

export const loginStateAction = (user, token, refreshToken) => (dispatch) => {
  user.role = user.role.toString();
  dispatch({
    type: "Login",
    payload: {
      user,
      token,
      refreshToken,
    },
  });
};

export const loginWithEmailAction = (email, password) => async (dispatch) => {
  try {
    const res = await signInWithEmail(email, password);
    if (res.status === 201) {
      dispatch(
        loginStateAction(
          res.data.data.user,
          res.data.data.token,
          res.data.data.refreshToken
        )
      );

      history.push("/");
    }
  } catch (err) {
    console.log(err);
  }
};

export const signInWithFacebookAction = (response) => async (dispatch) => {
  try {
    const res = await signInWithFacebook(response.accessToken);
    if (res.status === 201) {
      dispatch(
        loginStateAction(
          res.data.data.user,
          res.data.data.token,
          res.data.data.refreshToken
        )
      );

      history.push("/");
    }
  } catch (err) {
    console.log(err);
  }
};

export const logoutAction = () => (dispatch) => {
  dispatch({
    type: "Logout",
  });
  history.push("/login");
};

export const refreshTokenAction = (token, refreshToken) => (dispatch) => {
  dispatch({
    type: "RefreshToken",
    payload: {
      token,
      refreshToken,
    },
  });
};

export const signupAction = (obj) => async (dispatch) => {
  try {
    const res = await signupThroughEmail(obj);
    if (res.status === 201) {
      toastify("success", "Account successfully created");
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    }
  } catch (err) {
    console.log(err.response.data.err.message);
    if (err.response === undefined) {
    } else if (err.response.status === 400) {
      toastify("warning", err.response.data.err.message);
      setTimeout(() => {
        document.getElementById("signup-email")?.focus();
      }, 2000);
    }
  }
};

export const forgotPasswordAction = (email) => async () => {
  try {
    const res = await forgotPassword(email);
    if (res.status === 201) {
      toastify("success", res.data.data.message);
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    }
  } catch (err) {
    console.log(err.response.data.err.message);
    if (err.response === undefined) {
    } else {
      toastify("warning", err.response.data.err.message);
    }
  }
};

export const verifyResetLinkAction = (link) => async () => {
  try {
    const res = await verifyResetPasswordLink(link);
    if (res.status === 200) {
      toastify("success", "Link verified");
    }
  } catch (err) {
    console.log(err);
  }
};

export const resetPasswordAction = (link, password) => async () => {
  try {
    const res = await resetPassword(link, password);
    if (res.status === 200) {
      toastify("success", "Password has been updated");
      history.push("/login");
    }
  } catch (err) {
    console.log(err);
  }
};
