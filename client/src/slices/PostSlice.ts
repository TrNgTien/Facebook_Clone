import { createSlice } from "@reduxjs/toolkit";

export interface PostState {
  posts: Array<any>;
  isFetching: boolean;
  fetched: boolean;
  isCreatePost: boolean;
}
const initialState: PostState = {
  posts: [],
  isFetching: false,
  fetched: false,
  isCreatePost: false,
};
const PostSlice = createSlice({
  name: "PostSlice",
  initialState,
  reducers: {
    setIsCreatePost(state, action) {
      const { payload } = action;
      return { ...state, isCreatePost: payload };
    },
  },
});

//Actions
export const { setIsCreatePost } = PostSlice.actions;

//Reducer
const postReducer = PostSlice.reducer;
export default postReducer;
