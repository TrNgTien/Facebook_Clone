const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({ 
    commentContent: {
        type: String,
        required: true,
    },
    commentAttachments: {
        type: String,
        default: null,
    },
    userID: {
        type: String,
        required: true, 
    }
});

module.exports = mongoose.model("Comment", commentSchema);