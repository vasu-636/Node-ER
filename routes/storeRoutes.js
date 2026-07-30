const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/',protect, authorize('admin','staff'),storeController.getAllStores);
router.get('/:id',protect, authorize('admin','staff'),storeController.getStoreById);
router.post('/', protect, authorize('admin'), storeController.createStore);
router.put('/:id', protect, authorize('admin'), storeController.updateStore);
router.delete('/:id', protect, authorize('admin'), storeController.deleteStore);

module.exports = router;
