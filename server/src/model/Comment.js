const mongoose = require("mongoose");
const id = new mongoose.Types.ObjectId().toString();

const commentSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: id,
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