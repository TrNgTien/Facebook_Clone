import * as httpClient from "./BaseService";
import Path from "../constants/PathURL";
interface IAuthService {
  userName: string;
  password: string;
}
const LoginReq = (reqBody: IAuthService) => {
  return httpClient.post(Path.LOGIN, {
    ...reqBody,
  });
};

export { LoginReq };
