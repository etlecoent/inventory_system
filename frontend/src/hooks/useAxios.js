import axios from "axios";
export default function useAxios() {
  // axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  axios.defaults.headers = {
    ...axios.defaults.headers,
    "Access-Control-Allow-Origin": "*",
  };

  return axios;
}
