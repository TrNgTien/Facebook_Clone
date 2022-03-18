const express = require("express");
const router = express.Router();
const feedHandler = require("../controllers/FeedHandler");
const {Authentication} = require("../middleware/Authentication")

router.post("/addFeed", Authentication, feedHandler.addFeed);
router.get("/getAllFeed", Authentication, feedHandler.getFeed);
router.put("/reactFeed/:id", Authentication, feedHandler.reactFeed);
module.exports = router;
