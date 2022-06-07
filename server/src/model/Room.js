const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");

const roomSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: () => uuidv4(),
    },
    members: {
        type: Array,
        require: true
    }
});

module.exports = mongoose.model("Room", roomSchema);