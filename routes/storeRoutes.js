const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', storeController.getAllStores);
router.get('/:id', storeController.getStoreById);
router.post('/', protect, authorize('admin'), storeController.createStore);
router.put('/:id', protect, authorize('admin'), storeController.updateStore);
router.delete('/:id', protect, authorize('admin'), storeController.deleteStore);

module.exports = router;
