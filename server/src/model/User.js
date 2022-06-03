const mongoose = require('mongoose');
const picture = require('../constant/ConstantPicture');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: mongoose.Types.ObjectId().toString(),
    },
    userType: {
        type: Number,
        default: 1,
    },
    userAvatar: {
        type: Object,
        default: {
            url: picture.BLANK_AVATAR,
            publicID: "",
        },
    },
    userCover: {
        type: Object,
        default: {
            url: picture.BLANK_COVER,
            publicID: "",
        },
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
        default: "0/0/0",
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
    },
    friends: {
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model("User", userSchema);