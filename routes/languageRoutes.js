const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public read routes
router.get('/', protect, authorize('admin','staff'),languageController.getAllLanguages);
router.get('/:id', protect, authorize('admin','staff'),languageController.getLanguageById);

// Admin-only write/update/delete routes
router.post('/', protect, authorize('admin'), languageController.createLanguage);
router.put('/:id', protect, authorize('admin'), languageController.updateLanguage);
router.delete('/:id', protect, authorize('admin'), languageController.deleteLanguage);

module.exports = router;