import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { IUser } from "../constants/InterfaceModel";

export interface AuthState {
  currentUser?: any;
  isLoggedIn: boolean;
  logging: boolean;
}
export interface LoginPayload {
  userName: string;
  password: string;
}

const initialState: AuthState = {
  currentUser: undefined,
  isLoggedIn: false,
  logging: false,
};
const AuthenSlice = createSlice({
  name: "AuthenSlice",
  initialState,
  reducers: {
    login(state) {
      state.logging = true;
    },
    loginSucess(state) {
      state.logging = false;
    },
    userQuery(state, action: PayloadAction<any>) {
      state.currentUser = action.payload;
    },
    loginFailed(state) {
      state.logging = false;
    },
    logout(state) {
      state.currentUser = undefined;
      state.isLoggedIn = false;
    },
  },
});

//Actions
export const { login, loginSucess, loginFailed, logout, userQuery } = AuthenSlice.actions;

//Selectors
export const selectCurrentUser = (state: RootState) => state.auth?.currentUser;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;

//Reducer
const authReducer = AuthenSlice.reducer;
export default authReducer;
