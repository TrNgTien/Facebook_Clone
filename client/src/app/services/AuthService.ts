import * as httpClient from "./BaseService";
import Path from "../constants/PathURL";
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
  return httpClient.post(Path.LOGIN, {
    ...reqBody,
  });
};
const RegisterReq = (reqBody: IRegisterService) => {
  return httpClient.post(Path.REGISTER, {
    ...reqBody,
  });
};
export { LoginReq, RegisterReq };
