const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    email: {
        type: String,
        required: true
    },
    store_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Staff", staffSchema);
