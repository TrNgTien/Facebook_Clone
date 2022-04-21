const express = require("express");
const router = express.Router();
const feedHandler = require("../controllers/FeedHandler");
const {Authentication} = require("../middleware/Authentication")
const upload = require("../utils/multer")

router.post("/addFeed", upload.single('feedAttachments'), Authentication, feedHandler.addFeed);
router.get("/getAllFeed", Authentication, feedHandler.getFeed);
router.get("/getCommentOfFeed/:id", Authentication, feedHandler.getCommentOfFeed);
router.put("/reactFeed/:id", Authentication, feedHandler.reactFeed);
router.post("/commentFeed/:id", upload.single('commentAttachments'), Authentication, feedHandler.commentFeed);
router.delete("/deleteComment/:commentID/:feedID", Authentication, feedHandler.deleteComment);
module.exports = router;
