const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const Enrollment = require('../models/enrollment');
const Course = require('../models/course');
const User = require('../models/user');

describe('Enrollment Routes', () => {
    let adminToken;
    let testCourseId;
    let testStudentId;

    // Before running the tests, create a test admin user, course, and student, and obtain a token
    beforeAll(async () => {
        await User.deleteMany();
        await Course.deleteMany();

        // Create a test admin user
        await User.create({ username: 'admin', email: 'admin@gmail.com', password: 'adminpassword', role: 'Admin' });

        // Obtain a JWT token for the test admin user
        const user = await User.findOne({ username: 'admin' });

        // Generate JWT token
        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        adminToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Create a test course
        const course = await Course.create({ name: 'Test Course', code: 'TEST101', description: 'Test Course Description', credits: 3 });
        testCourseId = course._id;

        // Create a test student
        const student = await User.create({ username: 'student', email: 'student@example.com', password: 'studentpassword', role: 'Student' });
        testStudentId = student._id;

        const userStd = await User.findOne({ username: 'student' });

        // Generate JWT token
        const payloadStd = {
            userId: userStd._id,
            username: userStd.username,
            email: userStd.email,
            role: userStd.role
        };

        studentToken = jwt.sign(payloadStd, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    // Clear the database before running each test
    beforeEach(async () => {
        await Enrollment.deleteMany();
    });

    it('should enroll a student in a course', async () => {
        const enrollmentData = { studentId: testStudentId, courseId: testCourseId };

        const response = await request(app)
            .post('/api/enrollments/enroll')
            .set('Cookie', ['token=' + adminToken]) // Set the admin token in the cookie
            .send(enrollmentData);

        expect(response.status).toBe(201);
    });

    it('should fetch enrolled students for a course', async () => {
        await Enrollment.create({ studentId: testStudentId, courseId: testCourseId });

        const response = await request(app)
            .get(`/api/enrollments/course/${testCourseId}`)
            .set('Cookie', ['token=' + adminToken]); // Set the admin token in the cookie

        expect(response.status).toBe(200);
    });

    it('should remove enrollment for a student', async () => {
        await Enrollment.create({ studentId: testStudentId, courseId: testCourseId });
        const enrollmentData = { studentId: testStudentId, courseId: testCourseId };


        const response = await request(app)
            .delete(`/api/enrollments/remove`)
            .set('Cookie', ['token=' + adminToken]) // Set the admin token in the cookie
            .send(enrollmentData);

        expect(response.status).toBe(200);
    });

    it('should fetch enrollments for the current student', async () => {
        const enrollmentData = { studentId: testStudentId, courseId: testCourseId };

        // Enroll the student in a course
        await Enrollment.create(enrollmentData);

        const response = await request(app)
            .get('/api/enrollments/student')
            .set('Cookie', ['token=' + studentToken]); // Set the student token in the cookie

        expect(response.status).toBe(200);
    });
});
