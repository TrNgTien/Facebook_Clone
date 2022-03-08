const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userType: {
        type: Number,
    },
    userAvatar: {
        type: String,
        default: "",
    },
    userCover: {
        type: String,
        default: "",
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
        minLength: 5
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
        default: {},
    }
});

module.exports = mongoose.model("User", userSchema);