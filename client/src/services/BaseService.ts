import axios from "axios";
import jwtDecode from "jwt-decode";
import { IJwtDecode } from "@constants/InterfaceModel";
import Path from "@constants/PathURL";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

axiosInstance.interceptors.request.use(
  async (config: any) => {
    try {
      if (!config.headers.Authorization) {
        return config;
      } else {
        const tokenOriginal = config.headers.Authorization.slice(7);
        const tokenDecoded = jwtDecode<IJwtDecode>(tokenOriginal);
        const refreshToken = localStorage.getItem("refreshToken");
        const date = new Date();
        if (tokenDecoded.exp < date.getTime() / 1000) {
          const refreshTokenValue = refreshToken;
          const configHeader = {
            headers: {
              refreshToken: `${refreshTokenValue}`,
            },
          };
          const res = await axiosInstance.get(`${Path.REFRESH_TOKEN}`, configHeader);
          const newToken = res.data.token;
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
