export default process.env.NODE_ENV === "production"
  ? "https://example.com"
  : process.env.NODE_ENV === "development" && "http://localhost:5000";