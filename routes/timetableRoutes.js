const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const timetableController = require('../controllers/timetableController');

// Create a new class session (Admin only)
router.post('/', authMiddleware(['Admin']), timetableController.createSession);

// Get all class sessions
router.get('/', timetableController.getAllSessions);

// Get session by ID
router.get('/:id', timetableController.getSessionById);

// Update session by ID (Admin only)
router.put('/:id', authMiddleware(['Admin']), timetableController.updateSessionById);

// Delete session by ID (Admin only)
router.delete('/:id', authMiddleware(['Admin']), timetableController.deleteSessionById);

module.exports = router;
