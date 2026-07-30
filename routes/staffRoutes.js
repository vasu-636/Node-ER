const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/',protect, authorize('admin','staff'),staffController.getAllStaff);
router.get('/:id',protect, authorize('admin','staff'),staffController.getStaffById);
router.post('/', protect, authorize('admin'), staffController.createStaff);
router.put('/:id', protect, authorize('admin'), staffController.updateStaff);
router.delete('/:id', protect, authorize('admin'), staffController.deleteStaff);

module.exports = router;
