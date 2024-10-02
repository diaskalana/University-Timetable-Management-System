const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const courseController = require('../controllers/courseController');

// Create a new course (Admin only)
router.post('/', authMiddleware(['Admin']), courseController.createCourse);

// Get all courses
router.get('/', courseController.getAllCourses);

// Get course by ID
router.get('/:id', courseController.getCourseById);

// Update course by ID (Admin only)
router.put('/:id', authMiddleware(['Admin']), courseController.updateCourseById);

// Delete course by ID (Admin only)
router.delete('/:id', authMiddleware(['Admin']), courseController.deleteCourseById);

// Assign faculty to course (Admin only)
router.post('/assign-faculty', authMiddleware(['Admin']), courseController.assignFacultyToCourse);

module.exports = router;
