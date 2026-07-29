const Inventory = require('../models/inventoryModel');

// Get all inventories
exports.getAllInventories = async (req, res) => {
    try {
        const query = {};
        if (req.query.film_id) query.film_id = req.query.film_id;
        if (req.query.store_id) query.store_id = req.query.store_id;

        const inventories = await Inventory.find(query)
            .populate('film_id', 'title release_year')
            .populate('store_id');

        return res.status(200).json({ success: true, count: inventories.length, data: inventories });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get inventory by ID
exports.getInventoryById = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id)
            .populate('film_id', 'title release_year')
            .populate('store_id');

        if (!inventory) {
            return res.status(404).json({ success: false, message: "Inventory item not found" });
        }
        return res.status(200).json({ success: true, data: inventory });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Create inventory item
exports.createInventory = async (req, res) => {
    try {
        const { film_id, store_id } = req.body;
        if (!film_id || !store_id) {
            return res.status(400).json({ success: false, message: "film_id and store_id are required" });
        }

        const newInventory = await Inventory.create({ film_id, store_id });
        return res.status(201).json({ success: true, message: "Inventory created successfully", data: newInventory });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update inventory item
exports.updateInventory = async (req, res) => {
    try {
        const updatedInventory = await Inventory.findByIdAndUpdate(
            req.params.id,
            { ...req.body, last_update: Date.now() },
            { new: true, runValidators: true }
        )
            .populate('film_id', 'title release_year')
            .populate('store_id');

        if (!updatedInventory) {
            return res.status(404).json({ success: false, message: "Inventory item not found" });
        }
        return res.status(200).json({ success: true, message: "Inventory updated successfully", data: updatedInventory });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete inventory item
exports.deleteInventory = async (req, res) => {
    try {
        const deletedInventory = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedInventory) {
            return res.status(404).json({ success: false, message: "Inventory item not found" });
        }
        return res.status(200).json({ success: true, message: "Inventory item deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
