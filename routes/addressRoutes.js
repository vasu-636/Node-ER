const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', addressController.getAllAddresses);
router.get('/:id', addressController.getAddressById);
router.post('/', protect, authorize('admin'), addressController.createAddress);
router.put('/:id', protect, authorize('admin'), addressController.updateAddress);
router.delete('/:id', protect, authorize('admin'), addressController.deleteAddress);

module.exports = router;
