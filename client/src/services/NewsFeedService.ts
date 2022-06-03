import { axiosInstance } from "./BaseService";
import API_PATH from "@constants/API_PATH";

interface IAddFeed {
  ownerToken: string | null;
  imageBase64?: string | null;
  description?: string | null;
}
interface IUpdatePost {
  idPost: string;
  description: string;
  token: string | null;
}
const AddPost = (reqBody: IAddFeed) => {
  const { ownerToken, imageBase64, description } = reqBody;
  let configHeader = {
    headers: {
      Authorization: `Bearer ${ownerToken}`,
    },
  };
  return axiosInstance.post(
    API_PATH.POST_ADD,
    { description, postAttachments: imageBase64 },
    configHeader
  );
};
const getAllFeed = (token: string | null) => {
  let configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.get(API_PATH.POST_GET, configHeader);
};

interface IUpdatePost {
  idPost: string;
  description: string;
  token: string | null;
}
const updatePost = (reqBody: IUpdatePost) => {
  const { idPost, description, token } = reqBody;
  let configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.put(
    `${API_PATH.POST_UPDATE}/${idPost}`,
    { description },
    configHeader
  );
};

export { AddPost, getAllFeed, updatePost };
