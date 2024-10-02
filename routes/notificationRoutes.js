const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const notificationController = require('../controllers/notificationController');

// Create a new notification (Admin only)
router.post('/', authMiddleware(['Admin']), notificationController.createNotification);

// Get all notifications
router.get('/', notificationController.getAllNotifications);

// Get notification by ID
router.get('/:id', notificationController.getNotificationById);

// Send notification to user(s) (Admin only)
router.post('/:notificationId/send', authMiddleware(['Admin']), notificationController.sendNotification);

module.exports = router;
