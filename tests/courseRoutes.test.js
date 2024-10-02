const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const Course = require('../models/course');
const User = require('../models/user');

describe('Course Routes', () => {
    let adminToken;

    // Before running the tests, create a test admin user and obtain a token
    beforeAll(async () => {

        await User.deleteMany();


        // Create a test admin user
        await User.create({ username: 'admin', email: 'admin@example.com', password: 'adminpassword', role: 'Admin' });

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
    });

    // Clear the database before running each test
    beforeEach(async () => {
        await Course.deleteMany();
    });

    it('should create a new course', async () => {
        const courseData = { name: 'Mathematics', code: 'MATH101', description: 'Intro to Math', credits: 3 };

        const response = await request(app)
            .post('/api/courses')
            .set('Cookie', ['token=' + adminToken]) // Set the admin token in the cookie
            .send(courseData);

        expect(response.status).toBe(201);
    });

    it('should fetch existing courses', async () => {
        await Course.create({ name: 'Mathematics', code: 'MATH101', description: 'Intro to Math', credits: 3 });
        await Course.create({ name: 'Physics', code: 'PHYS101', description: 'Intro to Physics', credits: 4 });

        const response = await request(app)
            .get('/api/courses');

        expect(response.status).toBe(200);
    });

    it('should fetch a course by ID', async () => {
        const newCourse = await Course.create({ name: 'Mathematics', code: 'MATH101', description: 'Intro to Math', credits: 3 });

        const response = await request(app)
            .get(`/api/courses/${newCourse._id}`);

        expect(response.status).toBe(200);
    });

    it('should update a course by ID', async () => {
        const newCourse = await Course.create({ name: 'Mathematics', code: 'MATH101', description: 'Intro to Math', credits: 3 });

        const updatedData = { name: 'Physics', code: 'PHYS101', description: 'Intro to Physics', credits: 4 };

        const response = await request(app)
            .put(`/api/courses/${newCourse._id}`)
            .set('Cookie', ['token=' + adminToken]) // Set the admin token in the cookie
            .send(updatedData);

        expect(response.status).toBe(200);
    });

    it('should delete a course by ID', async () => {
        const newCourse = await Course.create({ name: 'Mathematics', code: 'MATH101', description: 'Intro to Math', credits: 3 });

        const response = await request(app)
            .delete(`/api/courses/${newCourse._id}`)
            .set('Cookie', ['token=' + adminToken]); // Set the admin token in the cookie

        expect(response.status).toBe(200);
    });
});
