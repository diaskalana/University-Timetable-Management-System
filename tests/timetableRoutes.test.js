const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const Timetable = require('../models/timetable');
const Course = require('../models/course');
const User = require('../models/user');

describe('Timetable Routes', () => {
    let adminToken;
    let testCourseId;
    let testFacultyId;

    // Before running the tests, create a test admin user, course, and faculty, and obtain a token
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
        testCourseId = course._id

        // Create a test faculty
        const faculty = await User.create({ username: 'faculty', email: 'faculty@example.com', password: 'facultypassword', role: 'Faculty' });
        testFacultyId = faculty._id

    });

    // Clear the database before running each test
    beforeEach(async () => {
        await Timetable.deleteMany();
    });

    it('should create a new session', async () => {
        const timetableData = {
            day: 'Monday',
            time: '10:00 AM',
            courseId: testCourseId,
            facultyId: testFacultyId,
            room: 'Room 101'
        };
        console.log(testCourseId)

        const response = await request(app)
            .post('/api/timetable')
            .set('Cookie', ['token=' + adminToken]) // Set the admin token in the cookie
            .send(timetableData);

        expect(response.status).toBe(201);
    });

    it('should fetch a session by ID', async () => {
        const newTimetable = await Timetable.create({
            day: 'Monday',
            time: '10:00 AM',
            courseId: testCourseId,
            facultyId: testFacultyId,
            room: 'Room 101'
        });

        const response = await request(app)
            .get(`/api/timetable/${newTimetable._id}`)
            .set('Cookie', ['token=' + adminToken]); // Set the admin token in the cookie

        expect(response.status).toBe(200);
    });

    it('should update a session by ID', async () => {
        const newTimetable = await Timetable.create({
            day: 'Monday',
            time: '10:00 AM',
            courseId: testCourseId,
            facultyId: testFacultyId,
            room: 'Room 101'
        });

        const updatedData = { course: testCourseId, faculty: testFacultyId, day: 'Tuesday', time: '11:00 AM', room: 'Room 102' };

        const response = await request(app)
            .put(`/api/timetable/${newTimetable._id}`)
            .set('Cookie', ['token=' + adminToken]) // Set the admin token in the cookie
            .send(updatedData);

        expect(response.status).toBe(200);
    });

    it('should delete a session by ID', async () => {
        const newTimetable = await Timetable.create({
            day: 'Monday',
            time: '10:00 AM',
            courseId: testCourseId,
            facultyId: testFacultyId,
            room: 'Room 101'
        });

        const response = await request(app)
            .delete(`/api/timetable/${newTimetable._id}`)
            .set('Cookie', ['token=' + adminToken]); // Set the admin token in the cookie

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Session deleted successfully');
    });
});
