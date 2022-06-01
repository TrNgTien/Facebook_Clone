import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  initialState,
  reducers: {
    setLoginSuccess(state, action: PayloadAction<any>) {
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
export const { setLoginSuccess, setLogout } = AuthenSlice.actions;

//Reducer
const authReducer = AuthenSlice.reducer;
export default authReducer;
