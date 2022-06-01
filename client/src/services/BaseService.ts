import axios, { AxiosRequestConfig } from "axios";
import jwtDecode from "jwt-decode";
import { IJwtDecode } from "@constants/InterfaceModel";
import API_PATH from "@constants/API_PATH";
import {
  deleteLocalStorage,
  setLocalStorage,
  getLocalStorage,
} from "@utils/LocalStorageUtil";

interface IAxios {
  config?: AxiosRequestConfig<any>;
  headers?: any;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:3334/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

axiosInstance.interceptors.request.use(
  async (config: IAxios) => {
    try {
      if (!config.headers.Authorization) {
        return config;
      } else {
        const tokenOriginal = config.headers.Authorization.slice(7);
        const tokenDecoded = jwtDecode<IJwtDecode>(tokenOriginal);
        const refreshToken = getLocalStorage("refreshToken");
        const date = new Date();
        if (tokenDecoded.exp < date.getTime() / 1000) {
          const refreshTokenValue = refreshToken;
          const configHeader = {
            headers: {
              refreshToken: `${refreshTokenValue}`,
            },
          };
          const res = await axiosInstance.get(`${API_PATH.REFRESH_TOKEN}`, configHeader);
          const newToken = res.data.token;
          setLocalStorage("token", newToken);
          deleteLocalStorage("refreshToken");
          config.headers.Authorization = `Bearer ${newToken}`;
        }
        return config;
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);
export { axiosInstance };
