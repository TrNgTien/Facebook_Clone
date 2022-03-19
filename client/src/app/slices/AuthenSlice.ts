import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  //   currentUser?: User;
}
export interface LoginPayload {
  userName: string;
  password: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
};
const AuthenSlice = createSlice({
  name: "AuthenSlice",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSucess(state, action: PayloadAction<string>) {
      state.logging = true;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
    },

    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

//Actions
export const AuthenAction = AuthenSlice.actions;


//Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;

//Reducer
const AuthenReducer = AuthenSlice.reducer;
export default AuthenReducer;
