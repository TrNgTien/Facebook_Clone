const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId().toString();
const postSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: id,
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
        type: String,
        required: true,
    },
    userReact: {
        type: Array,
        default: []
    },
});

module.exports = mongoose.model("Post", postSchema);