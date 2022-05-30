import { axiosInstance } from "./BaseService";
import API_PATH from "@constants/API_PATH";
const getProfileID = (id: string) => {
  return axiosInstance.get(`${API_PATH.GET_USER_PROFILE}/${id}`);
};
const getPostById = (userID: string | undefined) => {
    return axiosInstance.get(`${API_PATH.POST_GET_ID}?id=${userID}`);
  };
export { getProfileID, getPostById };
