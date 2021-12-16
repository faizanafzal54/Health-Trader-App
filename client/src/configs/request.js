import axios from "axios";
import { toastify } from "../actions/userActions";
import { apiUrl } from "./config";

axios.defaults.baseURL = `${apiUrl}`;

axios.interceptors.response.use(null, async (error) => {
  if (error.config && error.response && error.response.status === 401) {
    toastify("error", error.response.data.err.message);
  }
  if (error.config && error.response && error.response.status !== 401) {
    toastify("error", error.response.data.err.message);
  }

  return Promise.reject(error);
});
const request = axios;
export default request;
