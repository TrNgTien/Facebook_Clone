import { createSlice } from "@reduxjs/toolkit";

export interface PostState {
  isCreatePost: boolean;
  viewPostData: any;
  listPosts: Array<any>;
  viewCommentPost: {
    isView: boolean;
    idPost: any;
  };
}
const initialState: PostState = {
  isCreatePost: false,
  viewPostData: {
    isViewPost: false,
    dataPost: {},
  },
  listPosts: [],
  viewCommentPost: {
    isView: false,
    idPost: "",
  },
};
const PostSlice = createSlice({
  name: "PostSlice",
  initialState,
  reducers: {
    setIsCreatePost(state, action) {
      const { payload } = action;
      return { ...state, isCreatePost: payload };
    },
    setViewPost(state, action) {
      const { payload } = action;
      return { ...state, viewPostData: payload };
    },
    setListPosts(state, action) {
      const { payload } = action;
      return { ...state, listPosts: payload };
    },
    setViewCommentPost(state, action) {
      const { payload } = action;
      return { ...state, viewCommentPost: payload };
    },
  },
});

//Actions
export const { setIsCreatePost, setViewPost, setListPosts, setViewCommentPost } =
  PostSlice.actions;

//Reducer
const postReducer = PostSlice.reducer;
export default postReducer;
