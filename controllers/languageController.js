const Language = require('../models/languageModel');

// Get all languages
exports.getAllLanguages = async (req, res) => {
    try {
        const languages = await Language.find();
        return res.status(200).json({ success: true, count: languages.length, data: languages });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get language by ID
exports.getLanguageById = async (req, res) => {
    try {
        const language = await Language.findById(req.params.id);
        if (!language) {
            return res.status(404).json({ success: false, message: "Language not found" });
        }
        return res.status(200).json({ success: true, data: language });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Create language
exports.createLanguage = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Language name is required" });
        }
        const newLanguage = await Language.create({ name });
        return res.status(201).json({ success: true, message: "Language created successfully", data: newLanguage });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update language
exports.updateLanguage = async (req, res) => {
    try {
        const updatedLanguage = await Language.findByIdAndUpdate(
            req.params.id,
            { ...req.body, last_update: Date.now() },
            { new: true, runValidators: true }
        );
        if (!updatedLanguage) {
            return res.status(404).json({ success: false, message: "Language not found" });
        }
        return res.status(200).json({ success: true, message: "Language updated successfully", data: updatedLanguage });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete language
exports.deleteLanguage = async (req, res) => {
    try {
        const deletedLanguage = await Language.findByIdAndDelete(req.params.id);
        if (!deletedLanguage) {
            return res.status(404).json({ success: false, message: "Language not found" });
        }
        return res.status(200).json({ success: true, message: "Language deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
