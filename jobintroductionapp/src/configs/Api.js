import axios from "axios";
import cookie from "react-cookies";

export let endpoints = {
  work: "/work/",
  "work-detail": (workId) => `/work/${workId}/`,
  employer: "/employer/",
  "employer-detail": (employerId) => `/employer/${employerId}/`,
  login: "/o/token/",
  "current-user": "/users/current-user/",
  register: "/users/",
  apply: "/apply/",
};

export const authApi = () => {
  return axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
      Authorization: `Bearer ${cookie.load("token")}`,
    },
  });
};

export default axios.create({
  baseURL: "http://127.0.0.1:8000/",
});
