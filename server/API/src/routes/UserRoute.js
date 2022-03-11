const express = require("express");
const router = express.Router();
const userHandler = require("../controllers/UserHandler");


router.post("/register", userHandler.register);
router.get("/login", userHandler.login);

module.exports = router;

