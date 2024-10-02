const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roomController = require('../controllers/roomController');

// Create a new room (Admin only)
router.post('/', authMiddleware(['Admin']), roomController.createRoom);

// Get all rooms
router.get('/', roomController.getAllRooms);

// Get room by ID
router.get('/:id', roomController.getRoomById);

// Update room by ID (Admin only)
router.put('/:id', authMiddleware(['Admin']), roomController.updateRoomById);

// Delete room by ID (Admin only)
router.delete('/:id', authMiddleware(['Admin']), roomController.deleteRoomById);

module.exports = router;
