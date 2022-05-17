import * as httpClient from "./BaseService";
import Path from "../constants/PathURL";

import { NavigateFunction } from "react-router-dom";
import { login, loginSucess, loginFailed, userQuery } from "../slices/AuthenSlice";
import { IUser } from "../constants/InterfaceModel";
interface IAuthService {
  userName: string;
  password: string;
}

interface IRegisterService {
  gender: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  day: string;
  month: string;
  year: string;
}
const LoginReq = (reqBody: IAuthService, dispatch: any, navigate: NavigateFunction) => {
  return httpClient
    .post(Path.LOGIN, {
      ...reqBody,
    })
    .then((res: any) => {
      console.log("User: ", res);

      const { token } = res;
      localStorage.setItem("token", token);

      dispatch(login());
      setTimeout(() => {
        dispatch(loginSucess());
        navigate("feeds");
      }, 2000);
    })
    .catch((err: any) => {
      dispatch(loginFailed);
      alert(`${err}`);
    });
};
const RegisterReq = (reqBody: IRegisterService) => {
  return httpClient.post(Path.REGISTER, {
    ...reqBody,
  });
};
const ReqUserById = async (userId: string, dispatch: any) => {
  try {
    const res = await httpClient.getById(Path.GET_USER, userId);
    console.log("res: ", res.data.DOB);
    dispatch(userQuery(res.data));
  } catch (error) {
    alert(error);
  }
};
export { LoginReq, RegisterReq, ReqUserById };
