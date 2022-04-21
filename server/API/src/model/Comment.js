const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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
        type: ObjectId,
        required: true, 
    },
    feedID:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Comment", commentSchema);