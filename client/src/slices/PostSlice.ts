import { createSlice } from "@reduxjs/toolkit";

export interface PostState {
  posts: Array<any>;
  isFetching: boolean;
  fetched: boolean;
  isCreatePost: boolean;
  viewPostData: any;
}
const initialState: PostState = {
  posts: [],
  isFetching: false,
  fetched: false,
  isCreatePost: false,
  viewPostData: {
    isViewPost: false,
    dataPost: {},
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
  },
});

//Actions
export const { setIsCreatePost, setViewPost } = PostSlice.actions;

//Reducer
const postReducer = PostSlice.reducer;
export default postReducer;
