import { axiosInstance } from "./BaseService";

import PATH from "../constants/PathURL";
const AddFeed = (reqBody: any) => {
  return axiosInstance.post(PATH.FEEDS_ADD, reqBody);
};
const getAllFeed = (token: any) => {
  let configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.get(PATH.FEEDS_GET, configHeader);
};
const getProfileID = (token: any | null, id: string) => {
  let configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.get(`${PATH.GET_USER_PROFILE}/${id}`, configHeader);
};

export { AddFeed, getAllFeed, getProfileID };
