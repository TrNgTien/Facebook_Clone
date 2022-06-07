import axios, { AxiosRequestConfig } from "axios";
import jwtDecode from "jwt-decode";
import { IJwtDecode } from "@constants/InterfaceModel";
import API_PATH from "@constants/API_PATH";
import ENV_API from "@environment/environment";
import {
  deleteLocalStorage,
  setLocalStorage,
  getLocalStorage,
} from "@utils/LocalStorageUtil";

interface IAxios {
  config?: AxiosRequestConfig<any>;
  headers?: any;
}

const axiosInstance = axios.create(ENV_API);

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
          const configHeader = {
            headers: {
              refreshToken: `${refreshToken}`,
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
