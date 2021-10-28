import request from "../../configs/request";

export const changeProfilePicture = (image: any, userId: string) => {
  let formdata = new FormData();
  formdata.append("image", image);
  formdata.append("userId", userId);

  return request.put(`/users/profilePicture`, formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const removeProfilePicture = (userId: string, key: string) => {
  return request.put(`/users/removeProfilePicture`, { userId, key });
};

export const deactivateAccount = (userId: string) => {
  return request.put(`/users/deactivate?userId=${userId}`);
};

export const updateProfile = (userObj: any) => {
  return request.put(`/users/update`, { ...userObj });
};

export const changePassword = (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  return request.put(`users/changePassword`, {
    userId,
    oldPassword,
    newPassword,
  });
};
