const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    release_year: {
        type: Number,
        required: true
    },
    language_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
        required: true
    },
    original_language_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language"
    },
    rental_duration: {
        type: Number,
        required: true
    },
    rental_rate: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    replacement_cost: {
        type: Number,
        required: true
    },
    rating: {
        type: String,
        default: 'G'
    },
    special_features: {
        type: [String],
        default: []
    },
    fulltext: {
        type: String
    },
    revenue_projection: {
        type: Number,
        default: 0
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Film", filmSchema);