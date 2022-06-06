const express = require("express");
const router = express.Router();
const userHandler = require("../controllers/UserHandler");
const { Authentication } = require("../middleware/Authentication");

router.put("/updateInfor/:userID", Authentication, userHandler.updateInformation);
router.put(
  "/updateAvatar/:id",
  Authentication,
  userHandler.updateAvatar
);
router.put(
  "/updateCover/:id",
  Authentication,
  userHandler.updateCover
);

module.exports = router;
