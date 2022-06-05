const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");
const id = uuidv4();
const postSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: () => uuidv4(),
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