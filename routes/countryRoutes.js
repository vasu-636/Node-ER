const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin','staff'),countryController.getAllCountries);
router.get('/:id',protect, authorize('admin','staff'), countryController.getCountryById);
router.post('/', protect, authorize('admin'), countryController.createCountry);
router.put('/:id', protect, authorize('admin'), countryController.updateCountry);
router.delete('/:id', protect, authorize('admin'), countryController.deleteCountry);

module.exports = router;