import { axiosInstance } from "./BaseService";

import Path from "../constants/PathURL";

import { NavigateFunction } from "react-router-dom";
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
const LoginReq = (reqBody: IAuthService) => {
  let dataReq = { ...reqBody };
  return axiosInstance.post(Path.LOGIN, dataReq);
};
const RegisterReq = (reqBody: IRegisterService) => {
  let dataReq = { ...reqBody };
  return axiosInstance.post(Path.REGISTER, dataReq);
};
// const ReqUserById = async (userId: string, dispatch: any) => {
//   try {
//     const res = await httpClient.getById(Path.GET_USER, userId);
//     console.log("res: ", res.data.DOB);
//     dispatch(userQuery(res.data));
//   } catch (error) {
//     alert(error);
//   }
// };
export { LoginReq, RegisterReq };
