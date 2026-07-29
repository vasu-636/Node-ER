const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    country_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        required: true
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("City", citySchema);
