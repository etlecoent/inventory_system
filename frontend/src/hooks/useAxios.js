import axios from "axios";
export default function useAxios(token) {
  axios.defaults.headers.common["Authorization"] = token;
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  axios.defaults.headers = {
    ...axios.defaults.headers,
    "Access-Control-Allow-Origin": "*",
  };

  return axios;
}
