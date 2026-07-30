const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/',protect, authorize('admin','staff'),inventoryController.getAllInventories);
router.get('/:id',protect, authorize('admin','staff'),inventoryController.getInventoryById);
router.post('/', protect, authorize('admin'), inventoryController.createInventory);
router.put('/:id', protect, authorize('admin'), inventoryController.updateInventory);
router.delete('/:id', protect, authorize('admin'), inventoryController.deleteInventory);

module.exports = router;
