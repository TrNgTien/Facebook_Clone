const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");


const commentSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: () => uuidv4(),
    }, 
    commentContent: {
        type: String,
        required: true,
    },
    commentAttachments: {
        type: Object,
        default: {
            url: "",
            public_id: ""
        },
    },
    userID: {
        type: String,
        required: true, 
    },
    feedID:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Comment", commentSchema);