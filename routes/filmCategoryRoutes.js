const express = require('express');
const router = express.Router();
const filmCategoryController = require('../controllers/filmCategoryController');

router.get('/', filmCategoryController.getAllFilmCategories);
router.post('/', filmCategoryController.createFilmCategory);
router.delete('/:id', filmCategoryController.deleteFilmCategory);

module.exports = router;
