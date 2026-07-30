const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const { protect, authorize  } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin','staff'),addressController.getAllAddresses);
router.get('/:id', protect, authorize('admin','staff'),addressController.getAddressById);
router.post('/', protect, authorize('admin'), addressController.createAddress);
router.put('/:id', protect, authorize('admin'), addressController.updateAddress);
router.delete('/:id', protect, authorize('admin'), addressController.deleteAddress);

module.exports = router;
