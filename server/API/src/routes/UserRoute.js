const express = require("express");
const router = express.Router();
const userHandler = require("../controllers/UserHandler");
const {Authentication, adminVerify} = require("../middleware/Authentication")
const upload = require("../utils/multer")


router.post("/register", userHandler.register);
router.post("/login", userHandler.login);
router.get("/getAllUser", Authentication, adminVerify, userHandler.getAllUser);
router.get("/getAUser/:id", Authentication, userHandler.getUserInformation);
router.put("/updateInfor/:id", Authentication, userHandler.updateInformation);
router.put("/updateAvatar/:id", upload.single('userAvatar'), Authentication, userHandler.updateAvatar);
router.put("/updateCover/:id", upload.single('userCover'), Authentication, userHandler.updateCover);

module.exports = router;

