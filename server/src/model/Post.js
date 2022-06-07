const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const postSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: () => uuidv4(),
  },
  description: {
    type: String,
  },
  postAttachments: {
    type: Object,
    default: {
      url: "",
      public_id: "",
    },
  },
  time: {
    type: Date,
    default: Date.now,
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
    default: [],
  },
});

module.exports = mongoose.model("Post", postSchema);
