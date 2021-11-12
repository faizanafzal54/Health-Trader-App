import request from "../../configs/request";
import { apiUrl } from "../../configs/config";
import { Store } from "../../store";

export const signInWithFacebook = (access_token) => {
  return request.post(`${apiUrl}users/facebook/login`, {
    access_token,
  });
};

export const signInWithEmail = (email, password) => {
  return request.post(`${apiUrl}users/login`, {
    email,
    password,
  });
};

export const forgotPassword = (email) => {
  return request.post(`${apiUrl}users/forgotPassword`, {
    email,
  });
};

export const verifyResetPasswordLink = (link) => {
  return request.get(
    `${apiUrl}users/verifyResetLink?resetPasswordLink=${link}`
  );
};

export const verifyInviteLink = (link) => {
  return request.get(`${apiUrl}users/verifyInviteLink?inviteLink=${link}`);
};

export const resetPassword = (link, password) => {
  return request.put(`${apiUrl}users/resetPassword`, { link, password });
};

export const completeRegistration = (data) => {
  return request.put(`${apiUrl}users/completeRegistration`, data);
};

export const refreshToken = () => {
  const state = Store.getState();

  return request.put(`${apiUrl}users/refreshToken`, {
    refreshToken: state.user.refreshToken,
  });
};

export const checkAuth = () => {
  const state = Store.getState();
  if (state?.user?.isAuthenticated) return true;
  else return false;
};
