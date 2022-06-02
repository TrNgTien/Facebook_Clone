const ENV_API = {
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_SERVER_CONNECTION
      : "http://localhost:3334",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  env: process.env.NODE_ENV || "development",
  timeout: 300000,
};
export default ENV_API;
