const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const resourceController = require('../controllers/resourceController');

// Create a new resource (Admin only)
router.post('/', authMiddleware(['Admin']), resourceController.createResource);

// Get all resources
router.get('/', resourceController.getAllResources);

module.exports = router;
