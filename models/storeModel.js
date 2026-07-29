const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    manager_staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff"
    },
    address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Store", storeSchema);
