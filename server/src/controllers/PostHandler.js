const Post = require("../model/Post");
const User =  require("../model/User");
const Comment = require("../model/Comment");
const { v4: uuidv4 } = require("uuid");
const { uploadS3, deleteS3 } = require("../middleware/s3Services");
module.exports = {
  getPost: async (req, res) => {
    try {
      let allPost = await Post.find();
      return res.status(200).json({
        data: allPost,
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

  addPost: async (req, res) => {
    try {
      let { description, postAttachments } = req.body;
      let suffixes = uuidv4();
      let key = `post/${req.user.id}-${suffixes}`
      if (postAttachments === "") {
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
      } else if (description === "") {
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
      }
      else if (post.description === ""){
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
      else {
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
        await post.updateOne({ numberOfLike: post.numberOfLike + 1 });
        return res.status(200).json({
          message: "likes successfully",
        });
      } else {
        await post.updateOne({ $pull: { userReact: userID } });
        await post.updateOne({ numberOfLike: post.numberOfLike - 1 });
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
      let { id } = req.params;
      let { commentContent, commentAttachments } = req.body;
      let userID = req.user.id;
      let suffixes = uuidv4();
      let key = `comment/${req.user.id}-${suffixes}`;
      let post = await Post.findOne({"_id": id});
      if (commentAttachments === "") {
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
        await post.updateOne({ numberOfComment: post.numberOfComment + 1 });
        return res.status(200).json({
          message: "Comment successfully",
          id: comment._id,
        });
      } else if (commentContent === "") {
        let uploadResponse = await uploadS3(key, commentAttachments);
        let comment = new Comment({
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
        let uploadResponse = await uploadS3(key, commentAttachments);
        let comment = new Comment({
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
        if (comment.commentAttachments.url === "" && comment.commentAttachments.publicID === "") {
          await comment.remove();
          await Post.updateOne({ _id: comment.feedID }, { $inc: { numberOfComment: -1 } });
          return res.status(200).json({
            message: "Delete successfully",
          });
        }
        else if (comment.commentContent === ""){
          await comment.remove();
          await Post.updateOne({ _id: comment.feedID }, { $inc: { numberOfComment: -1 } });
          await deleteS3(comment.commentAttachments.publicID);
          return res.status(200).json({
            message: "Delete successfully",
          });
        }
        else{
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
      console.log(commentLength);
      let idUser = [];
      let commentData = [];
      for (let i = 0; i < commentLength; i++) {
        let id = comment[i].userID;
        idUser.push(id);
        for (let j = 0; j < idUser.length; j++) {
          let user = await User.find({ "_id": idUser[j]});
          commentData.push({
            commentID: comment[i]._id,
            commentContent: comment[i].commentContent,
            userAvatarCommented: user[0].userAvatar.url,
            userFullName: user[0].FirstName+" "+user[0].LastName,
          })
        }
      }
      return res.status(200).json({
        commentData: commentData,
      })
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
