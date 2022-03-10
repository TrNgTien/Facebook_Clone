const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const Authentication = (req, res, next) => {
  const token = req.get("authorization");
  if (token) {
    authtoken = token.slice(7);
    jwt.verify(authtoken, process.env.JWT_KEY, (err) => {
      if (err) {
        return res.json({ err: err });
      } else {
        next();
      }
    });
  } else {
    return res.status(403).send("UnAuthorized!");
  }
  next();
};
const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_KEY);
};

module.exports = { Authentication, generateAccessToken };
