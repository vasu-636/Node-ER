const mongoose = require('mongoose');

const filmCategorySchema = new mongoose.Schema({
    film_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Film",
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("FilmCategory", filmCategorySchema);