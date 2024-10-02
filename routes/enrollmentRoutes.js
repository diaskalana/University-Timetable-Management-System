const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const enrollmentController = require('../controllers/enrollmentController');

// Enroll student in a course
router.post('/enroll', authMiddleware(['Admin', 'Student', 'Faculty']), enrollmentController.enrollStudent);

// Get enrollments for the current student
router.get('/student', authMiddleware(['Admin', 'Student', 'Faculty']), enrollmentController.getStudentEnrollments);

// Get enrollments for a course
router.get('/course/:id', enrollmentController.getCourseEnrollments);

// Remove student from course (Admin or Faculty only)
router.delete('/remove', authMiddleware(['Admin', 'Faculty']), enrollmentController.removeStudentFromCourse);

module.exports = router;
