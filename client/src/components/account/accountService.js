import request from "../../configs/request";

export const getProfile = async (userId) => {
  return request.get(`/users/profile?userId=${userId}`);
};

export const updateProfile = async (obj) => {
  return request.put("/users/update", obj);
};

export const changeTimeZone = async (userId) => {
  return request.put("/users/changeTimeZone", {
    userId,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
};
