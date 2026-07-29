const Rental = require('../models/rentalModel');

// Get all rentals
exports.getAllRentals = async (req, res) => {
    try {
        const query = {};
        if (req.query.customer_id) query.customer_id = req.query.customer_id;
        if (req.query.staff_id) query.staff_id = req.query.staff_id;
        if (req.query.inventory_id) query.inventory_id = req.query.inventory_id;

        const rentals = await Rental.find(query)
            .populate({
                path: 'inventory_id',
                populate: { path: 'film_id', select: 'title rental_rate rental_duration' }
            })
            .populate('customer_id', 'first_name last_name email')
            .populate('staff_id', 'first_name last_name email');

        return res.status(200).json({ success: true, count: rentals.length, data: rentals });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get rental by ID
exports.getRentalById = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id)
            .populate({
                path: 'inventory_id',
                populate: { path: 'film_id', select: 'title rental_rate rental_duration' }
            })
            .populate('customer_id', 'first_name last_name email')
            .populate('staff_id', 'first_name last_name email');

        if (!rental) {
            return res.status(404).json({ success: false, message: "Rental record not found" });
        }
        return res.status(200).json({ success: true, data: rental });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Create rental (Authenticated users/staff/admin can create a rental)
exports.createRental = async (req, res) => {
    try {
        const { inventory_id, customer_id, staff_id, rental_date, return_date } = req.body;
        if (!inventory_id || !customer_id || !staff_id) {
            return res.status(400).json({ success: false, message: "inventory_id, customer_id, and staff_id are required" });
        }

        const newRental = await Rental.create({
            inventory_id,
            customer_id,
            staff_id,
            rental_date: rental_date || Date.now(),
            return_date
        });

        return res.status(201).json({ success: true, message: "Rental created successfully", data: newRental });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update rental (e.g. process return)
exports.updateRental = async (req, res) => {
    try {
        const updatedRental = await Rental.findByIdAndUpdate(
            req.params.id,
            { ...req.body, last_update: Date.now() },
            { new: true, runValidators: true }
        )
            .populate({
                path: 'inventory_id',
                populate: { path: 'film_id', select: 'title rental_rate rental_duration' }
            })
            .populate('customer_id', 'first_name last_name email')
            .populate('staff_id', 'first_name last_name email');

        if (!updatedRental) {
            return res.status(404).json({ success: false, message: "Rental record not found" });
        }
        return res.status(200).json({ success: true, message: "Rental updated successfully", data: updatedRental });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete rental
exports.deleteRental = async (req, res) => {
    try {
        const deletedRental = await Rental.findByIdAndDelete(req.params.id);
        if (!deletedRental) {
            return res.status(404).json({ success: false, message: "Rental record not found" });
        }
        return res.status(200).json({ success: true, message: "Rental deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
