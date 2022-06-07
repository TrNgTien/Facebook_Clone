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
    setUpdateUser(state, action: PayloadAction<any>){
      const {payload} = action;
      return {...state, currentUser: payload};
    },
    setLogout(state) {
      return { ...state, currentUser: null, isLogged: false };
    },
  },
});

//Actions
export const { setLoginSuccess, setUpdateUser, setLogout } = AuthenSlice.actions;

//Reducer
const authReducer = AuthenSlice.reducer;
export default authReducer;
