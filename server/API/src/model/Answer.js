const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    answerContent: {
        type: String,
        require: true,
    },
    questionID: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model("Answer", answerSchema);