const FilmCategory = require('../models/filmCategoryModel');

// Get all film-category links
exports.getAllFilmCategories = async (req, res) => {
    try {
        const query = {};
        if (req.query.film_id) query.film_id = req.query.film_id;
        if (req.query.category_id) query.category_id = req.query.category_id;

        const filmCategories = await FilmCategory.find(query)
            .populate('film_id', 'title release_year')
            .populate('category_id', 'name');

        return res.status(200).json({ success: true, count: filmCategories.length, data: filmCategories });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Add category to film
exports.createFilmCategory = async (req, res) => {
    try {
        const { film_id, category_id } = req.body;
        if (!film_id || !category_id) {
            return res.status(400).json({ success: false, message: "film_id and category_id are required" });
        }

        const existing = await FilmCategory.findOne({ film_id, category_id });
        if (existing) {
            return res.status(400).json({ success: false, message: "Category is already assigned to this film" });
        }

        const newLink = await FilmCategory.create({ film_id, category_id });
        return res.status(201).json({ success: true, message: "Category assigned to film successfully", data: newLink });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete film-category link by ID
exports.deleteFilmCategory = async (req, res) => {
    try {
        const deletedLink = await FilmCategory.findByIdAndDelete(req.params.id);
        if (!deletedLink) {
            return res.status(404).json({ success: false, message: "FilmCategory link not found" });
        }
        return res.status(200).json({ success: true, message: "Category removed from film" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
