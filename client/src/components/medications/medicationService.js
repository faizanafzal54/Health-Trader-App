import request from "../../configs/request";

export const createMedication = (obj) => {
  return request.post(`/medication/create`, obj);
};

export const getMedications = (userId) => {
  return request.get(`/medication?userId=${userId}`);
};

export const createGroup = (obj) => {
  return request.post(`/medication/createGroup`, obj);
};

export const getGroups = (userId) => {
  return request.get(`/medication/groups?userId=${userId}`);
};
