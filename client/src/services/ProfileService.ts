import { axiosInstance } from "./BaseService";
import API_PATH from "@constants/API_PATH";
const getProfileID = (id: string | undefined) => {
  return axiosInstance.get(`${API_PATH.GET_USER_PROFILE}/${id}`);
};
const getPostById = (userID: string | undefined) => {
  return axiosInstance.get(`${API_PATH.POST_GET_ID}?id=${userID}`);
};
interface IReqBody {
  userProfile: any;
  token: string | null;
  userId: string;
}
interface IUpdateImg {
  token: string | null;
  imageBase64: string | ArrayBuffer | null;
  userId: string;
}

const updateUserInfo = (reqBody: IReqBody) => {
  const { userProfile, token, userId } = reqBody;

  let configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.put(
    `${API_PATH.USER_PROFILE_UPDATE}/${userId}`,
    userProfile,
    configHeader
  );
};
const updateAvatar = (reqBody: IUpdateImg) => {
  const { token, imageBase64, userId } = reqBody;
  let configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.put(
    `${API_PATH.USER_AVATAR_UPDATE}/${userId}`,
    { userAvatar: imageBase64 },
    configHeader
  );
};
const updateCover = (reqBody: IUpdateImg) => {
  const { token, imageBase64, userId } = reqBody;
  let configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.put(
    `${API_PATH.USER_COVER_UPDATE}/${userId}`,
    { userCover: imageBase64 },
    configHeader
  );
};
const getOwnFriends = (token: string | null) => {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.get(`${API_PATH.GET_FRIENDS}`, configHeader);
};
export {
  getProfileID,
  getPostById,
  updateUserInfo,
  updateAvatar,
  updateCover,
  getOwnFriends,
};
