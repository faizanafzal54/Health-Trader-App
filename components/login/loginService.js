import axios from "axios";
import { apiUrl } from "../../configs/config";
import { Store } from "../../store";

export const signInWithLinkedIn = (accessToken) => {
  return axios.post(`${apiUrl}users/linkedIn/login`, {
    accessToken,
  });
};

export const signInWithEmail = (email, password) => {
  return axios.post(`${apiUrl}users/login`, {
    email,
    password,
  });
};

export const forgotPassword = (email) => {
  return axios.post(`${apiUrl}users/forgotPassword`, {
    email,
  });
};

export const verifyResetPasswordLink = (link) => {
  return axios.get(`${apiUrl}users/verifyResetLink?resetPasswordLink=${link}`);
};

export const refreshToken = () => {
  const state = Store.getState();

  return axios.put(`${apiUrl}users/refreshToken`, {
    refreshToken: state.user.refreshToken,
  });
};

export const checkAuth = () => {
  const state = Store.getState();
  if (state?.user?.isAuthenticated) return true;
  else return false;
};
