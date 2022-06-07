import jwtDecode from "jwt-decode";
import { IJwtDecode } from "@constants/InterfaceModel";
export const decodedID = (token: string) => {
  const decoded = jwtDecode<IJwtDecode>(token);
  return decoded.id;
};
