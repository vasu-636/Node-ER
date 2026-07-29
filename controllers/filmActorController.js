const FilmActor = require('../models/filmactorModel');

// Get all film-actor links
exports.getAllFilmActors = async (req, res) => {
    try {
        const query = {};
        if (req.query.film_id) query.film_id = req.query.film_id;
        if (req.query.actor_id) query.actor_id = req.query.actor_id;

        const filmActors = await FilmActor.find(query)
            .populate('film_id', 'title release_year')
            .populate('actor_id', 'first_name last_name');

        return res.status(200).json({ success: true, count: filmActors.length, data: filmActors });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Add actor to film
exports.createFilmActor = async (req, res) => {
    try {
        const { film_id, actor_id } = req.body;
        if (!film_id || !actor_id) {
            return res.status(400).json({ success: false, message: "film_id and actor_id are required" });
        }

        const existing = await FilmActor.findOne({ film_id, actor_id });
        if (existing) {
            return res.status(400).json({ success: false, message: "Actor is already assigned to this film" });
        }

        const newLink = await FilmActor.create({ film_id, actor_id });
        return res.status(201).json({ success: true, message: "Actor assigned to film successfully", data: newLink });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete film-actor link by ID
exports.deleteFilmActor = async (req, res) => {
    try {
        const deletedLink = await FilmActor.findByIdAndDelete(req.params.id);
        if (!deletedLink) {
            return res.status(404).json({ success: false, message: "FilmActor link not found" });
        }
        return res.status(200).json({ success: true, message: "Actor removed from film" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
