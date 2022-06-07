import { createSlice } from "@reduxjs/toolkit";

export interface PostState {
  isCreatePost: boolean;
  viewPostData: any;
  listPosts: Array<any>;
  idPostNeedDelete: string;
}
const initialState: PostState = {
  isCreatePost: false,
  viewPostData: {
    isViewPost: false,
    dataPost: {},
  },
  listPosts: [],
  idPostNeedDelete: "",
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
    setDeletePost(state, action) {
      const { payload } = action;
      return { ...state, idPostNeedDelete: payload };
    },
  },
});

//Actions
export const { setIsCreatePost, setViewPost, setListPosts, setDeletePost } =
  PostSlice.actions;

//Reducer
const postReducer = PostSlice.reducer;
export default postReducer;
