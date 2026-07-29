const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Actor", actorSchema);