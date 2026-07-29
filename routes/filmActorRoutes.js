const express = require('express');
const router = express.Router();
const filmActorController = require('../controllers/filmActorController');

router.get('/', filmActorController.getAllFilmActors);
router.post('/', filmActorController.createFilmActor);
router.delete('/:id', filmActorController.deleteFilmActor);

module.exports = router;
