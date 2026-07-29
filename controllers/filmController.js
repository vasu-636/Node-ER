const Film = require('../models/filmModel');

// Get all films (with optional search query)
exports.getAllFilms = async (req, res) => {
    try {
        const query = {};
        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: 'i' };
        }
        if (req.query.rating) {
            query.rating = req.query.rating;
        }

        const films = await Film.find(query)
            .populate('language_id', 'name')
            .populate('original_language_id', 'name');

        return res.status(200).json({ success: true, count: films.length, data: films });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get film by ID
exports.getFilmById = async (req, res) => {
    try {
        const film = await Film.findById(req.params.id)
            .populate('language_id', 'name')
            .populate('original_language_id', 'name');

        if (!film) {
            return res.status(404).json({ success: false, message: "Film not found" });
        }
        return res.status(200).json({ success: true, data: film });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Create film
exports.createFilm = async (req, res) => {
    try {
        const {
            title, description, release_year, language_id, original_language_id,
            rental_duration, rental_rate, length, replacement_cost, rating,
            special_features, fulltext, revenue_projection
        } = req.body;

        if (!title || !description || release_year === undefined || !language_id || rental_duration === undefined || rental_rate === undefined || length === undefined || replacement_cost === undefined) {
            return res.status(400).json({ success: false, message: "Missing required film fields" });
        }

        const newFilm = await Film.create({
            title,
            description,
            release_year,
            language_id,
            original_language_id,
            rental_duration,
            rental_rate,
            length,
            replacement_cost,
            rating,
            special_features,
            fulltext,
            revenue_projection
        });

        return res.status(201).json({ success: true, message: "Film created successfully", data: newFilm });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update film
exports.updateFilm = async (req, res) => {
    try {
        const updatedFilm = await Film.findByIdAndUpdate(
            req.params.id,
            { ...req.body, last_update: Date.now() },
            { new: true, runValidators: true }
        )
            .populate('language_id', 'name')
            .populate('original_language_id', 'name');

        if (!updatedFilm) {
            return res.status(404).json({ success: false, message: "Film not found" });
        }
        return res.status(200).json({ success: true, message: "Film updated successfully", data: updatedFilm });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete film
exports.deleteFilm = async (req, res) => {
    try {
        const deletedFilm = await Film.findByIdAndDelete(req.params.id);
        if (!deletedFilm) {
            return res.status(404).json({ success: false, message: "Film not found" });
        }
        return res.status(200).json({ success: true, message: "Film deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
