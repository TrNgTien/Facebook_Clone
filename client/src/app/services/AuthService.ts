import * as httpClient from "./BaseService";
import Path from "../constants/PathURL";
interface IAuthService {
  userName: string;
  password: string;
}

interface IRegisterService {
  // 
}
const LoginReq = (reqBody: IAuthService) => {
  return httpClient.post(Path.LOGIN, {
    ...reqBody,
  });
};
const RegisterReq = (reqBody: IRegisterService) => {
  // Todo...
}
export { LoginReq, RegisterReq };
