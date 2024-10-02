const Enrollment = require('../models/enrollment');

// Enroll student in a course
exports.enrollStudent = async (req, res) => {
    const { studentId, courseId } = req.body;

    try {
        // Check if student is already enrolled in the course
        const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: 'Student is already enrolled in this course' });
        }

        // Create enrollment
        const enrollment = await Enrollment.create({ studentId, courseId });
        res.status(201).json({ enrollment });
    } catch (error) {
        console.error('Error enrolling student:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get enrollments for a student
exports.getStudentEnrollments = async (req, res) => {
    const studentId = req.user.userId;

    try {
        const enrollments = await Enrollment.find({ studentId });
        res.json({ enrollments });
    } catch (error) {
        console.error('Error fetching student enrollments:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get enrollments for a course
exports.getCourseEnrollments = async (req, res) => {
    const courseId = req.params.id;

    try {
        const enrollments = await Enrollment.find({ courseId });
        res.json({ enrollments });
    } catch (error) {
        console.error('Error fetching course enrollments:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove student from course (Admin or Faculty only)
exports.removeStudentFromCourse = async (req, res) => {
    const { studentId, courseId } = req.body;

    try {
        // Check if enrollment exists
        const enrollment = await Enrollment.findOne({ studentId, courseId });
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        // Remove enrollment
        await Enrollment.findByIdAndDelete(enrollment._id);
        res.json({ message: 'Student removed from course successfully' });
    } catch (error) {
        console.error('Error removing student from course:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
