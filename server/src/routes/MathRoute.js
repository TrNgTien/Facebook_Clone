const express = require("express");
const router = express.Router();
const datingHandler = require("../controllers/DatingHandler");
const questionHandler = require("../controllers/QuestionHandler");
const answerHandler = require("../controllers/AnswerHandler");
const {Authentication, adminVerify} = require("../middleware/Authentication");

router.post("/addDatingProfile", Authentication, datingHandler.addDatingProfile);
router.put("/addDatingPicture/:id", Authentication, datingHandler.addDatingPicture);
router.get("/getAllDatingProfile", Authentication, adminVerify, datingHandler.getAllDatingProfile);
router.get("/getADatingProfile/:id", Authentication, datingHandler.getADatingProfile);
router.post("/addQuestion", Authentication, adminVerify, questionHandler.addQuestion);
router.post("/addAnswer/:id", Authentication, adminVerify, answerHandler.addAnswer);
router.get("/getAllQuestion", Authentication, adminVerify, questionHandler.getAllQuestion);
router.get("/getAQuestion/:id", Authentication, questionHandler.getAQuestion);
router.get("/getAnswerOfQuestion/:id", Authentication, answerHandler.getAnswerOfQuestion);

module.exports = router;