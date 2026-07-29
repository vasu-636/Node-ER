const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', rentalController.getAllRentals);
router.get('/:id', rentalController.getRentalById);
router.post('/', protect, rentalController.createRental);
router.put('/:id', protect, authorize('admin'), rentalController.updateRental);
router.delete('/:id', protect, authorize('admin'), rentalController.deleteRental);

module.exports = router;
