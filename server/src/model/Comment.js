const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const commentSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: mongoose.Types.ObjectId().toString(),
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
        type: ObjectId,
        required: true, 
    },
    feedID:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Comment", commentSchema);