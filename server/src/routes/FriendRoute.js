const express = require("express");
const router = express.Router();
const userHandler = require("../controllers/UserHandler");
const { Authentication } = require("../middleware/Authentication");

router.put("/addFriend/:friendID", Authentication, userHandler.addFriend);
router.get("/getFriends/", Authentication, userHandler.getFriends);
router.get("/getFriendsOfUser/:ownId", Authentication, userHandler.getFriendsOfUser);
router.delete("/deleteFriends/:friendID", Authentication, userHandler.deleteFriends);

module.exports = router;
