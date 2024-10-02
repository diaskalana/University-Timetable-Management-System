const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// Get current user
router.get('/me', authMiddleware(['Admin', 'Student', 'Faculty']), authController.getUser);

// Update user details
router.put('/me', authMiddleware(['Admin', 'Student', 'Faculty']), authController.updateUser);

// User logout
router.post('/logout', authController.logout);

module.exports = router;
