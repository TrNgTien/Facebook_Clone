import { axiosInstance } from "./BaseService";
import API_PATH from "@constants/API_PATH";

const AddFeed = (reqBody: any) => {
  return axiosInstance.post(API_PATH.FEEDS_ADD, reqBody);
};
const getAllFeed = (token: any) => {
  let configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.get(API_PATH.FEEDS_GET, configHeader);
};
const getProfileID = (token: any | null, id: string) => {
  let configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.get(`${API_PATH.GET_USER_PROFILE}/${id}`, configHeader);
};

export { AddFeed, getAllFeed, getProfileID };
