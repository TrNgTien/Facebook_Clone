const express = require("express");
const router = express.Router();
const feedHandler = require("../controllers/FeedHandler");
const { Authentication } = require("../middleware/Authentication");
const upload = require("../utils/multer");

router.post("/addFeed", Authentication, feedHandler.addFeed);
router.get("/getAllFeed", Authentication, feedHandler.getFeed);
router.get("/search", feedHandler.getPostById);
router.get("/getCommentOfFeed/:id", Authentication, feedHandler.getCommentOfFeed);
router.put("/reactFeed/:id", Authentication, feedHandler.reactFeed);
router.post(
  "/commentFeed/:id",
  upload.single("commentAttachments"),
  Authentication,
  feedHandler.commentFeed
);
router.delete(
  "/deleteComment/:commentID/:feedID",
  Authentication,
  feedHandler.deleteComment
);
router.put("/updatePost/:idPost", Authentication, feedHandler.updatePost);
module.exports = router;
