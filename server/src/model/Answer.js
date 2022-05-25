const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    answerContent: {
        type: String,
        required: true,
    },
    questionID: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Answer", answerSchema);