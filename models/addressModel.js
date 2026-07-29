const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    address2: {
        type: String
    },
    district: {
        type: String,
        required: true
    },
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
        required: true
    },
    postal_code: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Address", addressSchema);
