const Dating = require("../model/DatingProfile");
const cloudinary = require("../utils/cloudinary");
require("../utils/multer");

module.exports = {
    addDatingProfile: async (req, res) => {
        try{
            let {
                age,
                gender,
                name,
                location,
                height,
                hometown,
                lifeStyle,
                hobbies
            } = req.body;
            let {id} = req.user;
            let dating = new Dating({
                age: age,
                gender: gender,
                name: name,
                location: location,
                height: height,
                hometown: hometown,
                lifeStyle: lifeStyle,
                hobbies: hobbies,
                userID: id
            });
            await dating.save();
            return res.status(200).json({
                message: "Add successfully!"
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    },
    addDatingPicture: async (req, res) => {
        try{
            let {id} = req.params;
            let datingPicture = req.file.path;
            let dating = await Dating.findOne({userID: id});
            if (req.user.id === id && dating.picture.length <= 3){
                let uploadResponse = await cloudinary.uploader.upload(datingPicture, {
                resource_type: "auto",
                folder: "Facebook Clone/Dating Profile Pictures",
                })
                let datingPictureUrl = uploadResponse.secure_url;
                await dating.updateOne({$push: {datingPicture: datingPictureUrl}});
                return res.status(200).json({
                    message: "Add successfully!"
                });
            }
            if (req.user.id === id && dating.picture.length > 3){
                return res.status(401).json({
                    message: "You can only add 3 pictures!"
                });
            } 
            if (req.user.id !== id){
                return res.status(401).json({
                    message: "You can only add picture to your own profile!"
                });
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    },
    getAllDatingProfile: async (req, res) => {
        try{
            let datingProfiles = await Dating.find();
            return res.status(200).json({
                data: datingProfiles
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    },
    getADatingProfile: async (req, res) => {
        try{
            let {datingID} = req.params;
            let datingProfile = await Dating.findOne({_id: datingID});
            return res.status(200).json({
                data: datingProfile
            });
        }
        catch(error){
            console.log(error);
            return res.status(500).json("Internal server error");
        }
    }
}