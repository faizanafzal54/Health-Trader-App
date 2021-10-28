import request from "../../configs/request";

export const getFeed = async (page) => {
  return request.get(`/home?page=${page}&limit=5`);
};
export const commentOnPost = async (obj) => {
  return request.post(`/home/comment`, { ...obj });
};
export const getEvents = async () => {
  return request.get(`/events/limited`);
};
