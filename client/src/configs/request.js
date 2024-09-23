import axios from "axios";
import { logoutAction, toastify } from "../actions/userActions";
import { Store } from "../store";
import { apiUrl } from "./config";

axios.defaults.baseURL = `${apiUrl}`;

axios.interceptors.response.use(null, async (error) => {
  if (error.config && error.response && error.response.status === 401) {
    toastify("error", error.response?.data?.err?.message);
    Store.dispatch(logoutAction());
  }
  if (error.config && error.response && error.response.status !== 401) {
    toastify("error", error.response?.data?.err?.message);
  }

  return Promise.reject(error);
});
const request = axios;
export default request;
