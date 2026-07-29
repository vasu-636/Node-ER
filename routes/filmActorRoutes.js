const express = require('express');
const router = express.Router();
const filmActorController = require('../controllers/filmActorController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', filmActorController.getAllFilmActors);
router.post('/', protect, authorize('admin'), filmActorController.createFilmActor);
router.delete('/:id', protect, authorize('admin'), filmActorController.deleteFilmActor);

module.exports = router;
