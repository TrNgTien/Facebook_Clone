const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const user = require("../model/User");
dotenv.config();

const Authentication = (req, res, next) => {
	try {
		let token = req.get("Authorization");

		if (!token) {
			return res.status(401).json("UnAuthorized");
		} else {
			const authtoken = token.slice(7);
			const validatedUser = jwt.verify(authtoken, process.env.JWT_KEY);
			req.user = validatedUser;
			next();
		}
	} catch (error) {
		console.log(error);
		return res.status(401).json({ error: "Unauthorized" });
	}
};
const generateAccessToken = (user, role) => {
	return jwt.sign({ id: user, role: role }, process.env.JWT_KEY);
};
const adminVerify = (req, res, next) => {
	if (req.user.role === 0) next();
	else
		res.status(401).json({
			message: "You are not allowed",
		});
};

module.exports = { Authentication, generateAccessToken, adminVerify };
