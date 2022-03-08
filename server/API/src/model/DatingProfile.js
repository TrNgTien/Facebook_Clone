const mongoose = require('mongoose');

const datingProfileSchema = new mongoose.Schema({
    age: {
        type: Number,
    },
    gender: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        maxLength: 255,
    },
    location: {
        type: String,
        default: "",
    },
    height: {
        type: Number,
        default: 0,
    },
    hometown: {
        type: String,
        default: "",
    },
    lifeStyle: {
        type: String,
        default: "",
    },
    hobbies: {
        type: [String],
        default: [],
    },
    userID: {
        type: String,
    }
});


module.exports = mongoose.model("DatingProfile", datingProfileSchema); 