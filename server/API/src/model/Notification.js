const mongoose = require('mongoose');

const notiSchema = new mongoose.Schema({
    notiContent: {
        type: String,
        require: true,
    },
    userID: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model("Notification", notiSchema);