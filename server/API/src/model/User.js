const mongoose = require('mongoose');
const BLANK_AVATAR = require('../constant/ConstantPicture');
const BLANK_COVER = require('../constant/ConstantPicture');

const userSchema = new mongoose.Schema({
    userType: {
        type: Number,
        require: true,
    },
    userAvatar: {
        type: String,
        default: BLANK_AVATAR,
    },
    userCover: {
        type: String,
        default: BLANK_COVER,
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
        require: true,
        maxLength: 225,
        unique: true,
    },
    password: {
        type: String,
        minLength: 5,
        require: true,
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
            job: [],
            education: [],
            currentCity: "",
            hometown: "",
            relationship: ""
        },
    }
});

module.exports = mongoose.model("User", userSchema);