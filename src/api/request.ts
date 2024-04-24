import axios from "axios";
import { SPARE_BASE_REQUEST_URL } from "../constant";

const BASE_URL = "http://192.168.165.118:8080";
const request = axios.create({
  // baseURL: SPARE_BASE_REQUEST_URL,
  baseURL: BASE_URL,
  timeout: 5000,
});

//ok

request.interceptors.request.use(async (config) => {
  const token = (await import("../store")).useUserStore().state.token;
  if (token && token !== "") {
    config.headers.set("token", token);
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
  },
);

export default request;
