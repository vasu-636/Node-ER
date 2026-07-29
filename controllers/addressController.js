const Address = require('../models/addressModel');

// Get all addresses
exports.getAllAddresses = async (req, res) => {
    try {
        const query = {};
        if (req.query.city_id) query.city_id = req.query.city_id;

        const addresses = await Address.find(query).populate({
            path: 'city_id',
            populate: { path: 'country_id', select: 'country' }
        });
        return res.status(200).json({ success: true, count: addresses.length, data: addresses });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get address by ID
exports.getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id).populate({
            path: 'city_id',
            populate: { path: 'country_id', select: 'country' }
        });
        if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }
        return res.status(200).json({ success: true, data: address });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Create address
exports.createAddress = async (req, res) => {
    try {
        const { address, address2, district, city_id, postal_code, phone } = req.body;
        if (!address || !district || !city_id || !phone) {
            return res.status(400).json({ success: false, message: "address, district, city_id, and phone are required" });
        }

        const newAddress = await Address.create({
            address,
            address2,
            district,
            city_id,
            postal_code,
            phone
        });

        return res.status(201).json({ success: true, message: "Address created successfully", data: newAddress });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update address
exports.updateAddress = async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            { ...req.body, last_update: Date.now() },
            { new: true, runValidators: true }
        ).populate({
            path: 'city_id',
            populate: { path: 'country_id', select: 'country' }
        });

        if (!updatedAddress) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }
        return res.status(200).json({ success: true, message: "Address updated successfully", data: updatedAddress });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete address
exports.deleteAddress = async (req, res) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.id);
        if (!deletedAddress) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }
        return res.status(200).json({ success: true, message: "Address deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
