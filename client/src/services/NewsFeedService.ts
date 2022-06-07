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
  const configHeader = {
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
  const configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.get(API_PATH.POST_GET, configHeader);
};

const updatePost = (reqBody: IUpdatePost) => {
  const { idPost, description, token } = reqBody;
  const configHeader = {
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
const deletePost = (idPost: string, token: string | null) => {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.delete(`${API_PATH.POST_DELETE}/${idPost}`, configHeader);
};
const reactPost = (idPost: string, token: string | null) => {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.put(`${API_PATH.POST_LIKE}/${idPost}`, configHeader);
};
const getCommentByPostID = (idPost: string) => {
  return axiosInstance.get(`${API_PATH.POST_GET_COMMENT}/${idPost}`);
};
const addComment = (reqBody: any) => {
  const { idPost, token, commentContent } = reqBody;
  const configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosInstance.post(
    `${API_PATH.POST_ADD_COMMENT}/${idPost}`,
    { commentContent },
    configHeader
  );
};
export {
  AddPost,
  getAllFeed,
  updatePost,
  deletePost,
  reactPost,
  getCommentByPostID,
  addComment,
};
