const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin','staff'),customerController.getAllCustomers);
router.get('/:id',protect, authorize('admin','staff'),customerController.getCustomerById);
router.post('/', protect, authorize('admin'), customerController.createCustomer);
router.put('/:id', protect, authorize('admin'), customerController.updateCustomer);
router.delete('/:id', protect, authorize('admin'), customerController.deleteCustomer);

module.exports = router;
