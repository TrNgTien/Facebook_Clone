const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const postSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: mongoose.Types.ObjectId().toString(),
    },
    description: {
        type: String,
        required: true,
    },
    postAttachments: {
        type: Object,
        default: {
            url: "",
            public_id: ""
        },
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

module.exports = mongoose.model("Post", postSchema);