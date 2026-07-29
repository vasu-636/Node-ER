const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    store_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    activebool: {
        type: Boolean,
        default: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Number,
        default: 1
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Customer", customerSchema);
