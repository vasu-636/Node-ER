const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/',protect, authorize('admin','staff'),rentalController.getAllRentals);
router.get('/:id',protect, authorize('admin','staff'),rentalController.getRentalById);
router.post('/', protect, rentalController.createRental);
router.put('/:id', protect, authorize('admin'), rentalController.updateRental);
router.delete('/:id', protect, authorize('admin'), rentalController.deleteRental);

module.exports = router;
