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

interface LoginState {
  currentUser?: any;
  isLogged: boolean;
}
const initialState: LoginState = {
  currentUser: null,
  isLogged: false,
};
const AuthenSlice = createSlice({
  name: "AuthenSlice",
  initialState: initialState,
  reducers: {
    setLoginSucess(state, action: PayloadAction<any>) {
      const { payload } = action;
      return { ...state, currentUser: payload, isLogged: true };
    },
    setLogout(state, action: PayloadAction<any>) {
      const { payload } = action;
      return { ...state, currentUser: payload, isLogged: false };
    },
  },
});

//Actions
export const { setLoginSucess, setLogout } = AuthenSlice.actions;

//Reducer
const authReducer = AuthenSlice.reducer;
export default authReducer;
