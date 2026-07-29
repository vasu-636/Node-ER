const Store = require('../models/storeModel');

// Get all stores
exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.find()
            .populate('manager_staff_id', 'first_name last_name email')
            .populate('address_id');
        return res.status(200).json({ success: true, count: stores.length, data: stores });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get store by ID
exports.getStoreById = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id)
            .populate('manager_staff_id', 'first_name last_name email')
            .populate('address_id');
        if (!store) {
            return res.status(404).json({ success: false, message: "Store not found" });
        }
        return res.status(200).json({ success: true, data: store });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Create store
exports.createStore = async (req, res) => {
    try {
        const { manager_staff_id, address_id } = req.body;
        if (!address_id) {
            return res.status(400).json({ success: false, message: "address_id is required" });
        }

        const newStore = await Store.create({ manager_staff_id, address_id });
        return res.status(201).json({ success: true, message: "Store created successfully", data: newStore });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update store
exports.updateStore = async (req, res) => {
    try {
        const updatedStore = await Store.findByIdAndUpdate(
            req.params.id,
            { ...req.body, last_update: Date.now() },
            { new: true, runValidators: true }
        )
            .populate('manager_staff_id', 'first_name last_name email')
            .populate('address_id');

        if (!updatedStore) {
            return res.status(404).json({ success: false, message: "Store not found" });
        }
        return res.status(200).json({ success: true, message: "Store updated successfully", data: updatedStore });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete store
exports.deleteStore = async (req, res) => {
    try {
        const deletedStore = await Store.findByIdAndDelete(req.params.id);
        if (!deletedStore) {
            return res.status(404).json({ success: false, message: "Store not found" });
        }
        return res.status(200).json({ success: true, message: "Store deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
