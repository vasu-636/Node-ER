const Actor = require('../models/actorModel');

// Get all actors
exports.getAllActors = async (req, res) => {
    try {
        const actors = await Actor.find();
        return res.status(200).json({ success: true, count: actors.length, data: actors });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get actor by ID
exports.getActorById = async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id);
        if (!actor) {
            return res.status(404).json({ success: false, message: "Actor not found" });
        }
        return res.status(200).json({ success: true, data: actor });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Create actor
exports.createActor = async (req, res) => {
    try {
        const { first_name, last_name } = req.body;
        if (!first_name || !last_name) {
            return res.status(400).json({ success: false, message: "first_name and last_name are required" });
        }
        const newActor = await Actor.create({ first_name, last_name });
        return res.status(201).json({ success: true, message: "Actor created successfully", data: newActor });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update actor
exports.updateActor = async (req, res) => {
    try {
        const updatedActor = await Actor.findByIdAndUpdate(
            req.params.id,
            { ...req.body, last_update: Date.now() },
            { new: true, runValidators: true }
        );
        if (!updatedActor) {
            return res.status(404).json({ success: false, message: "Actor not found" });
        }
        return res.status(200).json({ success: true, message: "Actor updated successfully", data: updatedActor });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete actor
exports.deleteActor = async (req, res) => {
    try {
        const deletedActor = await Actor.findByIdAndDelete(req.params.id);
        if (!deletedActor) {
            return res.status(404).json({ success: false, message: "Actor not found" });
        }
        return res.status(200).json({ success: true, message: "Actor deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
