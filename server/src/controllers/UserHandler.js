const User = require("../model/User");
const authentication = require("../middleware/Authentication");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const AWS = require("aws-sdk");
const bluebird = require("bluebird");
const { uploadS3, deleteS3 } = require("../middleware/s3Services");
const { v4: uuidv4 } = require("uuid");
require("../utils/multer");

module.exports = {
  register: async (req, res) => {
    try {
      let {
        gender,
        userName,
        password,
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
          message: "Invalid Password",
        });
      }
      if (password.length < 6) {
        return res.status(400).json({
          message: "Password length must be more than 6 characters long",
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
          dataUser: {
            token: authentication.generateAccessToken(userID, userRole),
            refreshToken: authentication.generateRefreshToken(userID, userRole),
            userAvatar: user.userAvatar,
            userCover: user.userCover,
            biography: user.biography,
            gender: user.gender,
            fullName: user.firstName+" "+user.lastName,
            DOB: user.DOB,
            hobbies: user.hobbies,
            intro: user.intro,
          },
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
        data: {
          _id: userInfo._id,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          DOB: userInfo.DOB,
          gender: userInfo.gender,
          biography: userInfo.biography,
          hobbies: userInfo.hobbies,
          intro: userInfo.intro,
          friends: userInfo.friends,
          userAvatar: userInfo.userAvatar,
          userCover: userInfo.userCover
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  updateInformation: async (req, res) => {
    try {
      let { firstName, lastName, biography, gender, DOB, hobbies, intro } =
        req.body;
      let { id } = req.params;
      let user = await User.findOne({ _id: id });
      if (req.user.id === id) {
        await User.findByIdAndUpdate(
          user._id,
          {
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
  updateAvatar: async (req, res) => {
    try {
      let base64 = req.body.userAvatar;
      let suffixes = uuidv4();
      let key = `avatar/${req.user.id}-${suffixes}`;
      let { id } = req.params;
      if (req.user.id === id) {
        let uploadResponse = await uploadS3(base64, key);
        await User.findByIdAndUpdate(
          id,
          {
            userAvatar: {
              url: uploadResponse.locationS3,
              publicID: uploadResponse.keyS3,
            },
          },
          {
            new: true,
          }
        );
        return res.status(200).json({
          message: "Update successfully!",
        });
      } else {
        return res.status(401).json({
          message: "Only edit personal profiles",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  updateCover: async (req, res) => {
    try {
      let base64 = req.body.userCover;
      let suffixes = uuidv4();
      let key = `cover/${req.user.id}-${suffixes}`;
      let { id } = req.params;
      if (req.user.id === id) {
        let uploadResponse = await uploadS3(base64, key);
        await User.findByIdAndUpdate(
          id,
          {
            userCover: {
              url: uploadResponse.locationS3,
              publicID: uploadResponse.keyS3,
            },
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
  deleteUser: async (req, res) => {
    try {
      let { userID } = req.params;
      let user = await User.findOne({ _id: userID });
      if (req.user.id === userID || req.user.role === 0) {
        await user.remove();
        await deleteS3(user.userAvatar.publicID);
        await deleteS3(user.userCover.publicID);
        return res.status(200).json({
          message: "Delete successfully!",
        });
      } else {
        console.log(req.user.toString());
        return res.status(401).json({
          message: "You are not allowed",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  addFriend: async (req, res) => {
    try{
      let { friendID } = req.params;
      let userID = req.user.id;
      let user = await User.findOne({ _id: userID });
      await user.updateOne({$push: {friends: friendID}});
      return res.status(200).json({
        message: "Add friend successfully!",
      })
    }
    catch(error){
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  getFriends: async (req, res, next) => {
    try{
      let id = req.user.id;
      let user = await User.findOne({ _id: id });
      let friendList = user.friends;
      return res.status(200).json({
        friends: friendList,
      })
    } 
    catch(error){
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  getFriendsOfUser: async (req, res) => {
    let { ownId } = req.params;
    let user = await User.findOne({ _id: ownId });
    let friendList = user.friends;
    return res.status(200).json({
      friends: friendList,
    });
  },
  deleteFriends: async (req, res) => {
    try{
      let { friendID } = req.params;
      let userID = req.user.id;
      let user = await User.findOne({ _id: userID });
      await user.updateOne({$pull: {friends: friendID}});
      return res.status(200).json({
        message: "Delete friend successfully!",
      });
    }
    catch(error){
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  }
};
