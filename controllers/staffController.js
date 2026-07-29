const Staff = require('../models/staffModel');

// Get all staff
exports.getAllStaff = async (req, res) => {
    try {
        const query = {};
        if (req.query.store_id) query.store_id = req.query.store_id;

        const staffMembers = await Staff.find(query)
            .populate('address_id')
            .populate('store_id');

        return res.status(200).json({ success: true, count: staffMembers.length, data: staffMembers });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get staff by ID
exports.getStaffById = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id)
            .populate('address_id')
            .populate('store_id');

        if (!staff) {
            return res.status(404).json({ success: false, message: "Staff member not found" });
        }
        return res.status(200).json({ success: true, data: staff });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Create staff
exports.createStaff = async (req, res) => {
    try {
        const { first_name, last_name, address_id, email, store_id, active, username, password, picture } = req.body;
        if (!first_name || !last_name || !address_id || !email || !store_id || !username || !password) {
            return res.status(400).json({ success: false, message: "Missing required staff fields" });
        }

        const newStaff = await Staff.create({
            first_name,
            last_name,
            address_id,
            email,
            store_id,
            active,
            username,
            password,
            picture
        });

        return res.status(201).json({ success: true, message: "Staff member created successfully", data: newStaff });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update staff
exports.updateStaff = async (req, res) => {
    try {
        const updatedStaff = await Staff.findByIdAndUpdate(
            req.params.id,
            { ...req.body, last_update: Date.now() },
            { new: true, runValidators: true }
        )
            .populate('address_id')
            .populate('store_id');

        if (!updatedStaff) {
            return res.status(404).json({ success: false, message: "Staff member not found" });
        }
        return res.status(200).json({ success: true, message: "Staff member updated successfully", data: updatedStaff });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete staff
exports.deleteStaff = async (req, res) => {
    try {
        const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
        if (!deletedStaff) {
            return res.status(404).json({ success: false, message: "Staff member not found" });
        }
        return res.status(200).json({ success: true, message: "Staff member deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
