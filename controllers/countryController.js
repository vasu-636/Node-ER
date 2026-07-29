const Country = require('../models/countryModel');

// Get all countries
exports.getAllCountries = async (req, res) => {
    try {
        const countries = await Country.find();
        return res.status(200).json({ success: true, count: countries.length, data: countries });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get country by ID
exports.getCountryById = async (req, res) => {
    try {
        const country = await Country.findById(req.params.id);
        if (!country) {
            return res.status(404).json({ success: false, message: "Country not found" });
        }
        return res.status(200).json({ success: true, data: country });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Create country
exports.createCountry = async (req, res) => {
    try {
        const { country } = req.body;
        if (!country) {
            return res.status(400).json({ success: false, message: "Country name is required" });
        }
        const newCountry = await Country.create({ country });
        return res.status(201).json({ success: true, message: "Country created successfully", data: newCountry });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update country
exports.updateCountry = async (req, res) => {
    try {
        const updatedCountry = await Country.findByIdAndUpdate(
            req.params.id,
            { ...req.body, last_update: Date.now() },
            { new: true, runValidators: true }
        );
        if (!updatedCountry) {
            return res.status(404).json({ success: false, message: "Country not found" });
        }
        return res.status(200).json({ success: true, message: "Country updated successfully", data: updatedCountry });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete country
exports.deleteCountry = async (req, res) => {
    try {
        const deletedCountry = await Country.findByIdAndDelete(req.params.id);
        if (!deletedCountry) {
            return res.status(404).json({ success: false, message: "Country not found" });
        }
        return res.status(200).json({ success: true, message: "Country deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};