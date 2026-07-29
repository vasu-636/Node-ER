const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    film_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Film",
        required: true
    },
    store_id: {
        type: String,
        required: true
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Inventory", inventorySchema);
