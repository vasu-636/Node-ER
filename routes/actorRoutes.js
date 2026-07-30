const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public read routes
router.get('/',protect, authorize('admin','staff'),actorController.getAllActors);
router.get('/:id', protect, authorize('admin','staff'),actorController.getActorById);

// Admin-only write/update/delete routes
router.post('/', protect, authorize('admin'), actorController.createActor);
router.put('/:id', protect, authorize('admin'), actorController.updateActor);
router.delete('/:id', protect, authorize('admin'), actorController.deleteActor);

module.exports = router;
