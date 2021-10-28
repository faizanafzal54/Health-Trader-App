import request from "../../configs/request";

export const getAllSkills = () => {
  return request.get("/skills");
};
