const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public read routes
router.get('/', filmController.getAllFilms);
router.get('/:id', filmController.getFilmById);

// Admin-only write/update/delete routes
router.post('/', protect, authorize('admin'), filmController.createFilm);
router.put('/:id', protect, authorize('admin'), filmController.updateFilm);
router.delete('/:id', protect, authorize('admin'), filmController.deleteFilm);

module.exports = router;
