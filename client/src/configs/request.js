import axios from "axios";
import { toastify } from "../actions/userActions";
import { refreshToken } from "../components/login/loginService";
import { apiUrl } from "./config";

axios.defaults.baseURL = `${apiUrl}`;

axios.interceptors.response.use(null, async (error) => {
  console.log(error);
  if (error.config && error.response && error.response.status === 401) {
    const res = await refreshToken();
    console.log(res);
    if (res.status === 200) {
      // Store.dispatch(
      //   refreshTokenAction(res.data.data.token, res.data.data.refreshToken)
      // );
      // update token here then axios
      // error.response.config.headers[
      //   "Authorization"
      // ] = `Bearer ${res.data.data.token}`;
      // return axios(error.config);
    }
  }
  if (error.config && error.response && error.response.status !== 401) {
    toastify("error", error.response.data.err.message);
  }

  return Promise.reject(error);
});
const request = axios;
export default request;
