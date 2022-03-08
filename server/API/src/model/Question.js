const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionContent: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model("Question", questionSchema);