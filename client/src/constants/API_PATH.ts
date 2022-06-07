const PATH_API = {
  LOGIN: "auth/login",
  GET_USER: "auth/getAUser",
  REFRESH_TOKEN: "/auth/token",
  REGISTER: "auth/register",
  GET_USER_PROFILE: "auth/getAUser",
  GET_ALL_USER: "auth/getAllUser",
  
  POST_ADD: "post/addPost",
  POST_GET: "post/getAllPost",
  POST_GET_ID: "post/search",
  POST_UPDATE: "post/updatePost",
  POST_DELETE: "post/deletePost",
  POST_LIKE: "post/reactPost",
  POST_GET_COMMENT: "post/getCommentOfPost",
  POST_ADD_COMMENT: "post/addComment",

  USER_PROFILE_UPDATE: "profile/updateInfor",
  USER_AVATAR_UPDATE: "profile/updateAvatar",
  USER_COVER_UPDATE: "profile/updateCover",

  ADD_FRIEND: "friend/addFriend",
  GET_FRIENDS: "friend/getFriends",
};
export default PATH_API;
