import { axiosInstance } from "./BaseService";
import API_PATH from "@constants/API_PATH";

interface IAddFriend {
  token: string | null;
  friendId: string;
}

const getAllUser = (token: string | null) => {
  let configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.get(API_PATH.GET_ALL_USER, configHeader);
};
const addFriend = (reqBody: IAddFriend) => {
  const { token, friendId } = reqBody;

  let configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosInstance.put(`${API_PATH.ADD_FRIEND}/${friendId}`, {}, configHeader);
};

export { addFriend, getAllUser };
