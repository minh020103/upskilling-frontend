import axios from "axios";
const baseURL = "http://192.168.0.115:8080";
// const baseURL = "http://localhost:8081";
export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 120,
  headers: {
    "Content-type": "application/json"
  }
});

export const getRequest = async  <T>(url: string, params?: Object) => {
  try {
    let response = axiosInstance.get<T>(url, { params });
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return error.request;
    } else {
      return error.message;
    }
  }
};

export const postRequest = async  <T>(url: string, data: Object) => {
  try {
    let response = axiosInstance.post<T>(url, data);
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return error.request;
    } else {
      return error.message;
    }
  }
};

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.resolve(error.response);
});