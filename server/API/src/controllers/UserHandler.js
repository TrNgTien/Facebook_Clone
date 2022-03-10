const User = require("../model/User");
const authentication = require("../middleware/Authentication");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    register: async (req, res) => {
        try{
            let {
                userType,
                userAvatar, 
                userCover, 
                biography, 
                gender, 
                userName, 
                password, 
                firstName, 
                lastName, 
                DOB, 
                hobbies, 
                intro } = req.body;
            
            if(!userName || typeof userName !== 'string'){
                return res.status(400).json({
                    message: "Invalid UserName"
                })
            }
            if(!password || typeof password !== 'string'){
                return res.status(400).json({
                    message: "Invalid UserName"
                })
            }
            if(password.length < 5){
                return res.status(400).json({
                    message: "Password is too short, please try again"
                })
            }
            let hashedPassword = await bcrypt.hashSync(password, saltRounds);
            
            let user = new User({
                userType: userType,
                userAvatar: userAvatar,
                userCover: userCover,
                biography: biography,
                gender: gender,
                userName: userName,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                DOB: DOB,
                hobbies: hobbies,
                intro: intro
            })
            await user.save();
            res.status(200).json({
                message: "Register Successfully"
            });    
        }
        catch(error){
            console.log(JSON.stringify(error));
            if(error.code === 11000){
                return res.status(400).json({
                    message: "UserName already existed"
                })
            }
            return res.status(500).json("Internal server error");
        }
    },

    login: async (req, res) => {
        try{
            let {userName, password} = req.body;
            let user = await User.findOne({userName}).lean();
            let correctPassword = bcrypt.compareSync(password, user.password.toString());
            let userID = user._id.toString();

           if (!user || !correctPassword){
                return res.status(400).json({
                    message: "Incorrect UserName"
                })
            }
            else{
                return res.status(200).json({
                    message: "Login successfully",
                    token: authentication.generateAccessToken(userID),
                })
            }
        }   
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error")
        }
    }
}