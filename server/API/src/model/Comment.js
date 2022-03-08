const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({ 
    commentContent: {
        type: String,
    },
    commentAttachments: {
        type: String,
    },
    userID: {
        type: String, 
    }
});

module.exports = mongoose.model("Comment", commentSchema);