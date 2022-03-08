const mongoose = require('mongoose');

const notiSchema = new mongoose.Schema({
    notiContent: {
        type: String,
    },
    userID: {
        type: String,
    }
});

module.exports = mongoose.model("Notification", notiSchema);