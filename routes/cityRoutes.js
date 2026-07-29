const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getCityById);
router.post('/', protect, authorize('admin'), cityController.createCity);
router.put('/:id', protect, authorize('admin'), cityController.updateCity);
router.delete('/:id', protect, authorize('admin'), cityController.deleteCity);

module.exports = router;
