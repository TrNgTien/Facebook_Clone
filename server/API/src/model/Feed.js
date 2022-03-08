const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
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
    }
});

module.exports = mongoose.model("Feed", feedSchema);