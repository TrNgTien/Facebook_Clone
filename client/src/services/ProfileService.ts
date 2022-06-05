import { axiosInstance } from "./BaseService";
import API_PATH from "@constants/API_PATH";
const getProfileID = (id: string | undefined) => {
  return axiosInstance.get(`${API_PATH.GET_USER_PROFILE}/${id}`);
};
const getPostById = (userID: string | undefined) => {
  return axiosInstance.get(`${API_PATH.POST_GET_ID}?id=${userID}`);
};
interface IUserProfile {
  biography: string;
  hobbies: Array<string>;
  intro: IIntro | null;
}
interface IIntro {
  currentJob: string;
  currentEducation: string;
  currentCity: string;
  hometown: string;
  relationship: string;
}
const updateUserInfo = (userProfile: IIntro | undefined, userID: string | undefined) => {
  return axiosInstance.put(`${API_PATH.USER_PROFILE_UPDATE}?id=${userID}`);
};
export { getProfileID, getPostById };
