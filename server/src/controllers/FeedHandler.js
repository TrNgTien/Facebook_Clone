const Post = require("../model/Post");
const Comment = require("../model/Comment");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../utils/cloudinary");
const bluebird = require("bluebird");
require("../utils/multer");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({ region: process.env.AWS_BUCKET_REGION });
module.exports = {
  getFeed: async (req, res) => {
    try {
      let allFeed = await Post.find();
      return res.status(200).json({
        data: allFeed,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  getPostById: async (req, res) => {
    const userID = req.query.id;
    try {
      let userPost = await Post.find({ userID: userID });
      return res.status(200).json({
        userPosts: userPost,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },

  addFeed: async (req, res) => {
    try {
      let { description, postAttachments } = req.body;
      let suffixes = uuidv4();
      if (postAttachments === "") {
        let newFeed = new Post({
          description: description,
          postAttachments: {
            url: "",
            publicID: "",
          },
          userID: req.user.id,
        });
        await newFeed.save();
        let id = newFeed._id;
        return res.status(200).json({
          message: "Post Successfully!",
          id: id,
        });
      } else if (description === "") {
        const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_REGION, AWS_BUCKET_NAME } =
          process.env;

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
          postAttachments.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        // Getting the file type, ie: jpeg, png or gif
        const type = postAttachments.split(";")[0].split("/")[1];
        const params = {
          Bucket: AWS_BUCKET_NAME,
          Key: `post/${req.user.id}-${suffixes}`, // type is not required
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
        let newFeed = new Post({
          description: "",
          postAttachments: {
            url: location,
            publicID: key,
          },
          userID: req.user.id,
        });
        await newFeed.save();
        let id = newFeed._id;
        return res.status(200).json({
          message: "Post Successfully!",
          id: id,
        });
      } else {
        // let uploadResponse = await cloudinary.uploader.upload(postAttachments, {
        //   resource_type: "auto",
        //   folder: "Facebook Clone/Feed Attachments",
        // });
        // let postAttachmentsUrl = uploadResponse.secure_url;
        // let postAttachmentsPublicID = uploadResponse.public_id;
        const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_REGION, AWS_BUCKET_NAME } =
          process.env;

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
          postAttachments.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        // Getting the file type, ie: jpeg, png or gif
        const type = postAttachments.split(";")[0].split("/")[1];
        const params = {
          Bucket: AWS_BUCKET_NAME,
          Key: `post/${req.user.id}-${suffixes}`, // type is not required
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
        let newFeed = new Post({
          description: description,
          postAttachments: {
            url: location,
            publicID: key,
          },
          userID: req.user.id,
        });
        await newFeed.save();
        let id = newFeed._id;
        return res.status(200).json({
          message: "Post Successfully!",
          id: id,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  deleteFeed: async (req, res) => {
    try {
      let { feedID } = req.params;
      let { id } = req.user;
      let feed = await Post.findOne({ _id: feedID });
      console.log(feed);
      console.log(feed.postAttachments.publicID);
      let bucketParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: feed.postAttachments.publicID,
      };
      if (feed.userID === id) {
        await Post.findByIdAndDelete(feedID);
        await s3Client.send(new DeleteObjectCommand(bucketParams));
        return res.status(200).json({
          message: "Delete successfully!",
        });
      } else {
        return res.status(401).json({
          message: "You can only delete your own feed",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  reactFeed: async (req, res) => {
    try {
      let { id } = req.params;
      let userID = req.user.id;
      let feed = await Post.findById({ _id: id });
      if (!feed.userReact.includes(userID)) {
        await feed.updateOne({ $push: { userReact: userID } });
        await feed.updateOne({ numberOfLike: feed.numberOfLike + 1 });
        return res.status(200).json({
          message: "likes successfully",
        });
      } else {
        await feed.updateOne({ $pull: { userReact: userID } });
        await feed.updateOne({ numberOfLike: feed.numberOfLike - 1 });
        return res.status(200).json({
          message: "dislikes successfully",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  commentFeed: async (req, res) => {
    try {
      let { id } = req.params;
      let { commentContent, commentAttachments } = req.body;
      let userID = req.user.id;
      let feed = await Post.findById({ _id: id });
      if (typeof commentAttachments === "undefined") {
        let comment = new Comment({
          commentContent: commentContent,
          commentAttachments: {
            url: "",
            publicID: "",
          },
          userID: userID,
          feedID: id,
        });
        await comment.save();
      } else {
        // let uploadResponse = await cloudinary.uploader.upload(commentAttachments, {
        //   resource_type: "auto",
        //   folder: "Facebook Clone/Comment Attachments",
        // });
        // let commentAttachmentsUrl = uploadResponse.secure_url;
        // let commentAttachmentsPublicID = uploadResponse.public_id;
        const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_REGION, AWS_BUCKET_NAME } =
          process.env;

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
          commentAttachments.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        // Getting the file type, ie: jpeg, png or gif
        const type = commentAttachments.split(";")[0].split("/")[1];
        const params = {
          Bucket: AWS_BUCKET_NAME,
          Key: req.user.id, // type is not required
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
        let comment = new Comment({
          commentContent: commentContent,
          commentAttachments: {
            url: location,
            publicID: key,
          },
          userID: userID,
          feedID: id,
        });
        await comment.save();
        await feed.updateOne({ numberOfComment: feed.numberOfComment + 1 });
      }
      return res.status(200).json({
        message: "Comment successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  deleteComment: async (req, res) => {
    try {
      let { commentID, feedID } = req.params;
      let userID = req.user.id;
      let comment = await Comment.findById({ _id: commentID });
      let feed = await Feed.findById({ _id: feedID });
      if (comment.userID.toString() === userID || feed.userID.toString() === userID) {
        await comment.remove();
        await Feed.updateOne({ _id: comment.feedID }, { $inc: { numberOfComment: -1 } });
        await cloudinary.uploader.destroy(comment.commentAttachments.publicID);
        return res.status(200).json({
          message: "Delete successfully",
        });
      } else {
        return res.status(401).json({
          message: "You are not allowed to delete this comment",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  getCommentOfFeed: async (req, res) => {
    try {
      let { id } = req.params;
      let comment = await Comment.find({ feedID: id });
      return res.status(200).json({
        data: comment,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  updatePost: async (req, res) => {
    try {
      const { description } = req.body;
      const { idPost } = req.params;

      await Post.findOneAndUpdate({ _id: idPost }, { description: description });
      return res.status(200).json({
        message: "Update successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
};
