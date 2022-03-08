const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({ 
    commentContent: {
        type: String,
        require: true,
    },
    commentAttachments: {
        type: String,
        default: null,
    },
    userID: {
        type: String,
        require: true, 
    }
});

module.exports = mongoose.model("Comment", commentSchema);