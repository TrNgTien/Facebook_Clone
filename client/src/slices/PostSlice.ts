import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface PostState {
  posts: Array<any>;
  isFetching: boolean;
  fetched: boolean;
}
const initialState: PostState = {
  posts: [],
  isFetching: false,
  fetched: false,
};
const PostSlice = createSlice({
  name: "PostSlice",
  initialState,
  reducers: {
    postFetch(state, action: PayloadAction<Array<any>>) {
      state.posts = [...state.posts, ...action.payload];
    },
  },
});

//Actions
export const { postFetch } = PostSlice.actions;

//Reducer
const postReducer = PostSlice.reducer;
export default postReducer;
