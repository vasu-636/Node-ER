const City = require('../models/cityModel');

// Get all cities
exports.getAllCities = async (req, res) => {
    try {
        const query = {};
        if (req.query.country_id) query.country_id = req.query.country_id;

        const cities = await City.find(query).populate('country_id', 'country');
        return res.status(200).json({ success: true, count: cities.length, data: cities });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get city by ID
exports.getCityById = async (req, res) => {
    try {
        const city = await City.findById(req.params.id).populate('country_id', 'country');
        if (!city) {
            return res.status(404).json({ success: false, message: "City not found" });
        }
        return res.status(200).json({ success: true, data: city });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Create city
exports.createCity = async (req, res) => {
    try {
        const { city, country_id } = req.body;
        if (!city || !country_id) {
            return res.status(400).json({ success: false, message: "city name and country_id are required" });
        }
        const newCity = await City.create({ city, country_id });
        return res.status(201).json({ success: true, message: "City created successfully", data: newCity });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update city
exports.updateCity = async (req, res) => {
    try {
        const updatedCity = await City.findByIdAndUpdate(
            req.params.id,
            { ...req.body, last_update: Date.now() },
            { new: true, runValidators: true }
        ).populate('country_id', 'country');

        if (!updatedCity) {
            return res.status(404).json({ success: false, message: "City not found" });
        }
        return res.status(200).json({ success: true, message: "City updated successfully", data: updatedCity });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete city
exports.deleteCity = async (req, res) => {
    try {
        const deletedCity = await City.findByIdAndDelete(req.params.id);
        if (!deletedCity) {
            return res.status(404).json({ success: false, message: "City not found" });
        }
        return res.status(200).json({ success: true, message: "City deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
