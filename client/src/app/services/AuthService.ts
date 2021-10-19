import axios from "axios";

const loginReq = async (username: string, password: string) => {
  const response = await axios.post("http://localhost:5000/api/auth/login", {
    username,
    password,
  });
  return response.data;
};

export { loginReq };
