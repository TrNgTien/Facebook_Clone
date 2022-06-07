const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");

const messageSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: () => uuidv4(),
    },
    userID: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    roomID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Message", messageSchema);