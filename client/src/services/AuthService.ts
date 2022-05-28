import { axiosInstance } from "./BaseService";
import API_PATH from "@constants/API_PATH";

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
  return axiosInstance.post(API_PATH.LOGIN, dataReq);
};
const RegisterReq = (reqBody: IRegisterService) => {
  let dataReq = { ...reqBody };
  return axiosInstance.post(API_PATH.REGISTER, dataReq);
};
export { LoginReq, RegisterReq };
