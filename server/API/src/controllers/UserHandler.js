const User = require("../model/User");
const authentication = require("../middleware/Authentication");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  register: async (req, res) => {
    try {
      let {
        gender,
        userName,
        password,
        confirmPassword,
        firstName,
        lastName,
        day,
        month,
        year,
      } = req.body;

      if (!userName || typeof userName !== "string") {
        return res.status(400).json({
          message: "Invalid UserName",
        });
      }
      if (!password || typeof password !== "string") {
        return res.status(400).json({
          message: "Invalid UserName",
        });
      }
      if (password.length < 6) {
        return res.status(400).json({
          message: "Password length must be more than 6 characters long",
        });
      }
      if (confirmPassword !== password) {
        return res.status(400).json({
          message: "Password does not match",
        });
      }
      let hashedPassword = await bcrypt.hashSync(password, saltRounds);

      let user = new User({
        gender: gender,
        userName: userName,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        DOB: `${day}/${month}/${year}`,
      });
      await user.save();
      return res.status(200).json({
        message: "Register Successfully",
      });
    } catch (error) {
      console.log(error);
      console.log(JSON.stringify(error));
      if (error.code === 11000) {
        return res.status(400).json({
          message: "UserName already existed",
        });
      }
      return res.status(500).json("Internal server error");
    }
  },

  login: async (req, res) => {
    try {
      let { userName, password } = req.body;
      let user = await User.findOne({ userName }).lean();
      if (!user) {
        return res.status(400).json({
          message: "Incorrect UserName or Password",
        });
      }
      let userID = user._id.toString();
      let userRole = user.userType;
      let correctPassword = bcrypt.compareSync(
        password,
        user.password.toString()
      );

      if (!correctPassword) {
        return res.status(400).json({
          message: "Incorrect UserName or Password",
        });
      } else {
        return res.status(200).json({
          message: "Login successfully",
          token: authentication.generateAccessToken(userID, userRole),
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  getAllUser: async (req, res) => {
    try {
      let allUser = await User.find();
      return res.status(200).json({
        data: allUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  getUserInformation: async (req, res) => {
    try {
      let { id } = req.params;
      let userInfo = await User.findOne({ _id: id });
      return res.status(200).json({
        data: userInfo,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  updateInformation: async (req, res) => {
    try {
      let {
        userAvatar,
        userCover,
        firstName,
        lastName,
        biography,
        gender,
        DOB,
        hobbies,
        intro,
      } = req.body;
      let { id } = req.params;
      let user = await User.findOne({ _id: id });
      if (req.user.toString() === id) {
        await User.findByIdAndUpdate(
          user._id,
          {
            userAvatar: userAvatar,
            userCover: userCover,
            firstName: firstName,
            lastName: lastName,
            biography: biography,
            gender: gender,
            DOB: DOB,
            hobbies: hobbies,
            intro: intro,
          },
          {
            new: true,
          }
        );
        return res.status(200).json({
          message: "Update successfully!",
        });
      } else {
        console.log(req.user.toString());
        return res.status(401).json({
          message: "Only edit personal profiles",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
};
