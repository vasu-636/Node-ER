const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    rental_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    inventory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    return_date: {
        type: Date
    },
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: true
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Rental", rentalSchema);
