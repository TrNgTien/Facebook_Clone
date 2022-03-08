const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionContent: {
        type: String,
    }
});

module.exports = mongoose.model("Question", questionSchema);