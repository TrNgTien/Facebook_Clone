const ENV_API = {
  rootUrl:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL
      : "http://localhost:8080",
  env: process.env.NODE_ENV || "development",
  timeout: 300000,
};
export default ENV_API;
