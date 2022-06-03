const express = require("express");
const router = express.Router();
const feedHandler = require("../controllers/FeedHandler");
const { Authentication } = require("../middleware/Authentication");

router.post("/addPost", Authentication, feedHandler.addPost);
router.get("/getAllPost", Authentication, feedHandler.getPost);
router.get("/search", feedHandler.getPostById);
router.get("/getCommentOfPost/:id", Authentication, feedHandler.getCommentOfPost);
router.put("/reactPost/:id", Authentication, feedHandler.reactPost);
router.post(
  "/commentPost/:id",
  Authentication,
  feedHandler.commentPost
);
router.delete(
  "/deleteComment/:commentID/:postID",
  Authentication,
  feedHandler.deleteComment
);
router.put("/updatePost/:idPost", Authentication, feedHandler.updatePost);
router.delete("/deletePost/:postID", Authentication, feedHandler.deletePost);
module.exports = router;
