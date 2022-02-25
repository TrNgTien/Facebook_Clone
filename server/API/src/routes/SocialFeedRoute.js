const express = require("express");
const router = express.Router();
const feedHandler = require("../controllers/FeedHandler");
router.post("/addNewsFeed", feedHandler.addNewsFeed);
router.get("/getNewsFeed", feedHandler.getFeed);

module.exports = router;
