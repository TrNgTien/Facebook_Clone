export default process.env.NODE_ENV === "production"
  ? "https://code-snippet-server.herokuapp.com"
  : process.env.NODE_ENV === "development" && "http://localhost:5000";