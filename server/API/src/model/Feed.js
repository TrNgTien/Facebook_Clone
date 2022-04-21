const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
    numberOfComment: {
        type: Number,
        default: 0,
    },
    userID: {
        type: ObjectId,
        required: true,
    },
    userReact: {
        type: Array,
        default: []
    },
});

module.exports = mongoose.model("Feed", feedSchema);