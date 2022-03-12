const express = require("express");
const router = express.Router();
const userHandler = require("../controllers/UserHandler");
const {Authentication, adminVerify} = require("../middleware/Authentication")


router.post("/register", userHandler.register);
router.post("/login", userHandler.login);
router.get("/getAllUser", Authentication, adminVerify, userHandler.getAllUser);
router.get("/getAUser/:id", Authentication, userHandler.getUserInformation);
router.put("/updateInfor/:id", Authentication, userHandler.updateInformation);

module.exports = router;

