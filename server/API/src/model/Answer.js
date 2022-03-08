const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    answerContent: {
        type: String,
    },
    questionID: {
        type: String,
    }
});

module.exports = mongoose.model("Answer", answerSchema);