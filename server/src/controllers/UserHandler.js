const User = require("../model/User");
const authentication = require("../middleware/Authentication");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const AWS = require("aws-sdk");
const bluebird = require("bluebird");
const cloudinary = require("../utils/cloudinary");
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
        data: userInfo,
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
      let { id } = req.params;
      if (req.user.id === id) {
        const {AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_REGION, AWS_BUCKET_NAME} = process.env;

        // Configure AWS to use promise
        AWS.config.setPromisesDependency(bluebird);
        AWS.config.update({
          accessKeyId: AWS_ACCESS_KEY,
          secretAccessKey: AWS_SECRET_KEY,
          region: AWS_BUCKET_REGION,
        });

        // Create an s3 instance
        const s3 = new AWS.S3();

        // Ensure that you POST a base64 data to your server.
        // Let's assume the variable "base64" is one.
        const base64Data = new Buffer.from(
          base64.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        // Getting the file type, ie: jpeg, png or gif
        const type = base64.split(";")[0].split("/")[1];
        const params = {
          Bucket: AWS_BUCKET_NAME,
          Key: `avatar/${req.user.id}-${suffixes}`, // type is not required
          Body: base64Data,
          // ACL: 'public-read',
          ContentEncoding: "base64", // required
          ContentType: `image/jpeg`, // required. Notice the back ticks
        };
        let location = "";
        let key = "";
        const { Location, Key } = await s3.upload(params).promise();
        location = Location;
        key = Key;
        await User.findByIdAndUpdate(
          id,
          {
            userAvatar: {
              url: location,
              publicID: key,
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
  updateCover: async (req, res) => {
    try {
      let base64 = req.body.userCover;
      let suffixes = uuidv4();
      let { id } = req.params;
      if (req.user.id === id) {
        const {AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_REGION, AWS_BUCKET_NAME} = process.env;

        // Configure AWS to use promise
        AWS.config.setPromisesDependency(bluebird);
        AWS.config.update({
          accessKeyId: AWS_ACCESS_KEY,
          secretAccessKey: AWS_SECRET_KEY,
          region: AWS_BUCKET_REGION,
        });

        // Create an s3 instance
        const s3 = new AWS.S3();

        // Ensure that you POST a base64 data to your server.
        // Let's assume the variable "base64" is one.
        const base64Data = new Buffer.from(
          base64.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        // Getting the file type, ie: jpeg, png or gif
        const type = base64.split(";")[0].split("/")[1];
        const params = {
          Bucket: AWS_BUCKET_NAME,
          Key: `cover/${req.user.id}-${suffixes}`, // type is not required
          Body: base64Data,
          // ACL: 'public-read',
          ContentEncoding: "base64", // required
          ContentType: `image/jpeg`, // required. Notice the back ticks
        };
        let location = "";
        let key = "";
        const { Location, Key } = await s3.upload(params).promise();
        location = Location;
        key = Key;
        await User.findByIdAndUpdate(
          id,
          {
            userCover: {
              url: location,
              publicID: key,
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
      let { id } = req.params;
      let user = await User.findOne({ _id: id });
      if (req.user.id === id) {
        await User.findByIdAndDelete(id);
        await cloudinary.uploader.destroy(user.userAvatar.publicID);
        await cloudinary.uploader.destroy(user.userCover.publicID);
        return res.status(200).json({
          message: "Delete successfully!",
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
