const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    feedAttachments: {
        type: String,
        default: null,
    },
    time: {
        type: Date,
        default: Date.now
    },
    numberOfLike: {
        type: Number,
        default: 0,
    },
    numberOfCommnet: {
        type: Number,
        default: 0,
    },
    userID: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Feed", feedSchema);