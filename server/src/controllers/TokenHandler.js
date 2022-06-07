const {generateAccessToken} = require("../middleware/Authentication");

const JWT = require("jsonwebtoken");
module.exports = {
  refreshToken: async (req, res) => {
    try {
      let refreshToken = req.header("refreshToken");
      if (!refreshToken) {
        return res.status(401).json({ message: "Invalid Token!!" });
      } else {
        let user = await JWT.verify(refreshToken, process.env.REFRESH_JWT_KEY);
        let newAccessToken = generateAccessToken(
          user.id,
          user.role
        );
        return res.status(200).json({ token: newAccessToken });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
};