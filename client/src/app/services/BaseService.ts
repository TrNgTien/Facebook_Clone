import {
  resHandler,
  errResHandler,
} from "./interceptors/HttpResponseInterceptor";
import RequestHeaders from "../constants/RequestHeadear";
import ENV_API from "../../environment/enviroment";

const axios = require("axios").create({
  baseURL: ENV_API.rootUrl,
  timeout: ENV_API.timeout,
  headers: {
    "Content-Type": RequestHeaders.CONTENT_TYPE,
    "Access-Control-Allow-Headers": RequestHeaders.ACESS_CONTROLL_ALLOW_HEADERS,
    "Access-Control-Allow-Origin": RequestHeaders.ACESS_CONTROLL_ALLOW_ORIGIN,
    "Access-Control-Allow-Methods":
      RequestHeaders.ACESS_CONTROLL_ALLOW_METHODS.join(","),
  },
});

axios.interceptors.response.use(resHandler, errResHandler);

const get = (path = "", paramsObj = {}) => {
  return axios.get(path, {
    params: paramsObj,
  });
};

const getById = (path = "", id: string) => {
  return axios.get(`${path}/${id}`);
};

const post = (path = "", body = {}) => {
  return axios.post(path, { ...body });
};

const put = (path = "", body = {}) => {
  return axios.put(path, { ...body });
};

const deleteById = (path = "", id: string) => {
  return axios.delete(`${path}/${id}`);
};

export { get, getById, post, put, deleteById };
