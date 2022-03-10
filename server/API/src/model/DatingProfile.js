const mongoose = require('mongoose');

const datingProfileSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: true,
        default: 18,
    },
    gender: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: true,
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
        require: true,
    }
});


module.exports = mongoose.model("DatingProfile", datingProfileSchema); 