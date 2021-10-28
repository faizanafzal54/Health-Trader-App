import axios from "axios";
import { apiUrl } from "../../configs/config";

export const signupThroughEmail = (obj) => {
  obj.role = 1;

  return axios.post(`${apiUrl}users/signup`, {
    ...obj,
  });
};
