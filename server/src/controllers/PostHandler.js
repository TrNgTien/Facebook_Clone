const Post = require("../model/Post");
const User = require("../model/User");
const Comment = require("../model/Comment");
const { v4: uuidv4 } = require("uuid");
const { uploadS3, deleteS3 } = require("../middleware/s3Services");
module.exports = {
  getPost: async (req, res) => {
    try {
      let allPost = await Post.find();
      let allPostLength = allPost.length;
      let postData = {};
      let dataPost = [];
      for (let i = 0; i < allPostLength; i++) {
        let userReact = allPost[i].userReact;
        let userReactLength = userReact.length;
        let likedPost = [];
        if (userReactLength > 0) {
          for (let j = 0; j < userReactLength; j++) {
            let userReactInfo = await User.findOne({ _id: userReact[j] });
            likedPost.push({
              userAvatarLiked: userReactInfo.userAvatar.url,
              userFullName: userReactInfo.firstName + " " + userReactInfo.lastName,
              userID: userReactInfo._id,
            });
            postData = {
              description: allPost[i].description,
              numberOfComment: allPost[i].numberOfComment,
              postAttachments: allPost[i].postAttachments,
              time: allPost[i].time,
              userID: allPost[i].userID,
              userReact: allPost[i].userReact,
              likedPost: likedPost,
              __v: allPost[i].__v,
              _id: allPost[i]._id,
            };
          }
          dataPost.push(postData);
        } else {
          likedPost = [];
          postData = {
            description: allPost[i].description,
            numberOfComment: allPost[i].numberOfComment,
            postAttachments: allPost[i].postAttachments,
            time: allPost[i].time,
            userID: allPost[i].userID,
            userReact: allPost[i].userReact,
            likedPost: likedPost,
            __v: allPost[i].__v,
            _id: allPost[i]._id,
          };
          dataPost.push(postData);
        }
      }
      return res.status(200).json({
        dataPost,
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
      let userPostLength = userPost.length;
      let postData = {};
      let dataPost = [];
      for (let i = 0; i < userPostLength; i++) {
        let userReact = userPost[i].userReact;
        let userReactLength = userReact.length;
        let likedPost = [];
        if (userReactLength > 0) {
          for (let j = 0; j < userReactLength; j++) {
            let userReactInfo = await User.findOne({ _id: userReact[j] });
            likedPost.push({
              userAvatarLiked: userReactInfo.userAvatar.url,
              userFullName: userReactInfo.firstName + " " + userReactInfo.lastName,
              userID: userReactInfo._id,
            });
            postData = {
              description: userPost[i].description,
              numberOfComment: userPost[i].numberOfComment,
              postAttachments: userPost[i].postAttachments,
              time: userPost[i].time,
              userID: userPost[i].userID,
              userReact: userPost[i].userReact,
              likedPost: likedPost,
              __v: userPost[i].__v,
              _id: userPost[i]._id,
            };
          }
          dataPost.push(postData);
        } else {
          likedPost = [];
          postData = {
            description: userPost[i].description,
            numberOfComment: userPost[i].numberOfComment,
            postAttachments: userPost[i].postAttachments,
            time: userPost[i].time,
            userID: userPost[i].userID,
            userReact: userPost[i].userReact,
            likedPost: likedPost,
            __v: userPost[i].__v,
            _id: userPost[i]._id,
          };
          dataPost.push(postData);
        }
      }
      return res.status(200).json({
        dataPost,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },

  addPost: async (req, res) => {
    const { description, postAttachments } = req.body;
    try {
      let suffixes = uuidv4();
      let key = `post/${req.user.id}-${suffixes}`;
      if (!postAttachments) {
        let newPost = new Post({
          description: description,
          postAttachments: {
            url: "",
            publicID: "",
          },
          userID: req.user.id,
        });
        await newPost.save();
        let id = newPost._id;
        return res.status(200).json({
          message: "Post Successfully!",
          id: id,
        });
      } else if (!description) {
        let uploadResponse = await uploadS3(key, postAttachments);
        let newPost = new Post({
          description: "",
          postAttachments: {
            url: uploadResponse.locationS3,
            publicID: uploadResponse.keyS3,
          },
          userID: req.user.id,
        });
        await newPost.save();
        let id = newPost._id;
        return res.status(200).json({
          message: "Post Successfully!",
          id: id,
        });
      } else {
        let uploadResponse = await uploadS3(key, postAttachments);
        let newPost = new Post({
          description: description,
          postAttachments: {
            url: uploadResponse.locationS3,
            publicID: uploadResponse.keyS3,
          },
          userID: req.user.id,
        });
        await newPost.save();
        let id = newPost._id;
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
  deletePost: async (req, res) => {
    try {
      let { postID } = req.params;
      let { id } = req.user;
      let post = await Post.findOne({ _id: postID });
      if (post.postAttachments.publicID === "" && post.postAttachments.url === "") {
        if (post.userID.toString() === id) {
          await post.remove();
          return res.status(200).json({
            message: "Delete successfully!",
          });
        } else {
          return res.status(401).json({
            message: "You can only delete your own feed",
          });
        }
      } else if (post.description === "") {
        if (post.userID.toString() === id) {
          await post.remove();
          await deleteS3(post.postAttachments.publicID);
          return res.status(200).json({
            message: "Delete successfully!",
          });
        } else {
          return res.status(401).json({
            message: "You can only delete your own feed",
          });
        }
      } else {
        if (post.userID.toString() === id) {
          await post.remove();
          await deleteS3(post.postAttachments.publicID);
          return res.status(200).json({
            message: "Delete successfully!",
          });
        } else {
          return res.status(401).json({
            message: "You can only delete your own feed",
          });
        }
      }
      //let feed = await Post.find({ _id: feedID });
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  reactPost: async (req, res) => {
    try {
      let { id } = req.params;
      let userID = req.user.id;
      let post = await Post.findById({ _id: id });
      if (!post.userReact.includes(userID)) {
        await post.updateOne({ $push: { userReact: userID } });
        return res.status(200).json({
          message: "likes successfully",
        });
      } else {
        await post.updateOne({ $pull: { userReact: userID } });
        return res.status(200).json({
          message: "dislikes successfully",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  commentPost: async (req, res) => {
    try {
      const { id } = req.params;
      const { commentContent, commentAttachments } = req.body;
      const userID = req.user.id;
      const suffixes = uuidv4();
      const key = `comment/${req.user.id}-${suffixes}`;
      const post = await Post.findOne({ _id: id });
      if (!commentAttachments) {
        const comment = new Comment({
          commentContent: commentContent,
          commentAttachments: {
            url: "",
            publicID: "",
          },
          userID: userID,
          feedID: id,
        });
        await comment.save();
        await post.updateOne({ numberOfComment: post.numberOfComment + 1 });
        return res.status(200).json({
          message: "Comment successfully",
          id: comment._id,
        });
      } else if (!commentContent) {
        const uploadResponse = await uploadS3(key, commentAttachments);
        const comment = new Comment({
          commentContent: "",
          commentAttachments: {
            url: uploadResponse.locationS3,
            publicID: uploadResponse.keyS3,
          },
          userID: userID,
          feedID: id,
        });
        await comment.save();
        await post.updateOne({ numberOfComment: post.numberOfComment + 1 });
        return res.status(200).json({
          message: "Comment successfully",
          id: comment._id,
        });
      } else {
        const uploadResponse = await uploadS3(key, commentAttachments);
        const comment = new Comment({
          commentContent: commentContent,
          commentAttachments: {
            url: uploadResponse.locationS3,
            publicID: uploadResponse.keyS3,
          },
          userID: userID,
          feedID: id,
        });
        await comment.save();
        await post.updateOne({ numberOfComment: post.numberOfComment + 1 });
        return res.status(200).json({
          message: "Comment successfully",
          id: comment._id,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  },
  deleteComment: async (req, res) => {
    try {
      let { commentID, postID } = req.params;
      let userID = req.user.id;
      let comment = await Comment.findOne({ _id: commentID });
      let post = await Post.findById({ _id: postID });
      if (comment.userID.toString() === userID || post.userID.toString() === userID) {
        if (
          comment.commentAttachments.url === "" &&
          comment.commentAttachments.publicID === ""
        ) {
          await comment.remove();
          await Post.updateOne({ _id: comment.feedID }, { $inc: { numberOfComment: -1 } });
          return res.status(200).json({
            message: "Delete successfully",
          });
        } else if (comment.commentContent === "") {
          await comment.remove();
          await Post.updateOne({ _id: comment.feedID }, { $inc: { numberOfComment: -1 } });
          await deleteS3(comment.commentAttachments.publicID);
          return res.status(200).json({
            message: "Delete successfully",
          });
        } else {
          await comment.remove();
          await Post.updateOne({ _id: comment.feedID }, { $inc: { numberOfComment: -1 } });
          await deleteS3(comment.commentAttachments.publicID);
          return res.status(200).json({
            message: "Delete successfully",
          });
        }
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
  getCommentOfPost: async (req, res) => {
    try {
      let { id } = req.params;
      let comment = await Comment.find({ feedID: id });
      let commentLength = comment.length;
      let commentData = [];
      for (let i = 0; i < commentLength; i++) {
        let id = comment[i].userID;
        let user = await User.find({ _id: id });
        commentData.push({
          commentID: comment[i]._id,
          commentContent: comment[i].commentContent,
          userAvatarCommented: user[0].userAvatar.url,
          userFullName: user[0].firstName + " " + user[0].lastName,
          userID: comment[i].userID,
        });
      }
      return res.status(200).json({
        commentData: commentData,
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
