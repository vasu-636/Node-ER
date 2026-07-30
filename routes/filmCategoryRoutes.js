const express = require('express');
const router = express.Router();
const filmCategoryController = require('../controllers/filmCategoryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/',protect, authorize('admin','staff'),filmCategoryController.getAllFilmCategories);
router.post('/', protect, authorize('admin'), filmCategoryController.createFilmCategory);
router.delete('/:id', protect, authorize('admin'), filmCategoryController.deleteFilmCategory);

module.exports = router;
