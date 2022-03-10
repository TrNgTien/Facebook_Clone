const mongoose = require('mongoose');

const notiSchema = new mongoose.Schema({
    notiContent: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Notification", notiSchema);