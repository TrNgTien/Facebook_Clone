import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthenSlice";
import postReducer from "../slices/PostSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
