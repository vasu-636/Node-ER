const Customer = require('../models/customerModel');

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const query = {};
        if (req.query.store_id) query.store_id = req.query.store_id;
        if (req.query.name) {
            query.$or = [
                { first_name: { $regex: req.query.name, $options: 'i' } },
                { last_name: { $regex: req.query.name, $options: 'i' } }
            ];
        }

        const customers = await Customer.find(query)
            .populate('store_id')
            .populate({
                path: 'address_id',
                populate: { path: 'city_id', populate: { path: 'country_id' } }
            });

        return res.status(200).json({ success: true, count: customers.length, data: customers });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
            .populate('store_id')
            .populate({
                path: 'address_id',
                populate: { path: 'city_id', populate: { path: 'country_id' } }
            });

        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        return res.status(200).json({ success: true, data: customer });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Create customer
exports.createCustomer = async (req, res) => {
    try {
        const { store_id, first_name, last_name, email, address_id, activebool, active } = req.body;
        if (!store_id || !first_name || !last_name || !email || !address_id) {
            return res.status(400).json({ success: false, message: "Missing required customer fields" });
        }

        const newCustomer = await Customer.create({
            store_id,
            first_name,
            last_name,
            email,
            address_id,
            activebool,
            active
        });

        return res.status(201).json({ success: true, message: "Customer created successfully", data: newCustomer });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update customer
exports.updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            { ...req.body, last_update: Date.now() },
            { new: true, runValidators: true }
        )
            .populate('store_id')
            .populate({
                path: 'address_id',
                populate: { path: 'city_id', populate: { path: 'country_id' } }
            });

        if (!updatedCustomer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        return res.status(200).json({ success: true, message: "Customer updated successfully", data: updatedCustomer });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        return res.status(200).json({ success: true, message: "Customer deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
