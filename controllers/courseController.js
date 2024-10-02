const Course = require('../models/course');

// Create a new course
exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({ course });
    } catch (error) {
        console.error('Error creating course:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({ courses });
    } catch (error) {
        console.error('Error fetching courses:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ course });
    } catch (error) {
        console.error('Error fetching course:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update course by ID
exports.updateCourseById = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ course });
    } catch (error) {
        console.error('Error updating course:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete course by ID
exports.deleteCourseById = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Assign faculty to course
exports.assignFacultyToCourse = async (req, res) => {
    const { courseId, facultyId } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Update course with assigned faculty
        course.faculty = facultyId;
        await course.save();

        res.json({ message: 'Faculty assigned to course successfully' });
    } catch (error) {
        console.error('Error assigning faculty to course:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
