const mongoose = require('mongoose');
const picture = require('../constant/ConstantPicture');

const userSchema = new mongoose.Schema({
    userType: {
        type: Number,
        default: 1,
    },
    userAvatar: {
        type: String,
        default: picture.BLANK_AVATAR,
    },
    userCover: {
        type: String,
        default: picture.BLANK_COVER,
    },
    biography: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        default: "",
    }, 
    userName: {
        type: String,
        required: true,
        maxLength: 225,
        unique: true,
    },
    password: {
        type: String,
        minLength: 5,
        required: true,
    },
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    DOB: {
        type: String,
        default: "",
    },
    hobbies: {
        type: [String],
        default: [], 
    },
    intro: {
        type: Object,
        default: {
            currentJob: "",
            currentEducation: "",
            currentCity: "",
            hometown: "",
            relationship: ""
        },
    }
});

module.exports = User = mongoose.model("User", userSchema);