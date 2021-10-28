import request from "../../configs/request";

export const getReminders = async (userId) => {
  return request.get(`/reminders?userId=${userId}`);
};

export const setReminderStatus = async (reminderId, status) => {
  return request.put(`/reminders/setStatus`, { reminderId, status });
};

export const getmycircle = async (userId) => {
  return request.get(`/mycircle?userId=${userId}`);
};

export const inviteUser = async (obj) => {
  return request.post(`/users/inviteUser`, obj);
};
