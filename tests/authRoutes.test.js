const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../app');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

describe('Authentication Routes', () => {
    // Clear the database before running the tests
    beforeEach(async () => {
        await User.deleteMany();
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password', role: 'Student' });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeTruthy(); // Ensure a token is returned
    });

    it('should not register a user with an existing email', async () => {
        // Create a user with the same email
        await User.create({ username: 'existinguser', email: 'test@example.com', password: 'password', role: 'Student' });
        const response = await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password', role: 'Student' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User already exists');
    });

    it('should log in a user', async () => {
        // Create a user
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash('password', salt);
        await User.create({ username: 'testuser', email: 'test@example.com', password: passwordHashed, role: 'Student' });

        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'password' });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeTruthy(); // Ensure a token is returned
    });

    it('should not log in with invalid credentials', async () => {
        // Create a user
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash('password', salt);
        await User.create({ username: 'testuser', email: 'test@example.com', password: passwordHashed, role: 'Student' });

        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'invalidpassword' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid credentials');
    });

    it('should log out a user', async () => {
        // Create a user
        const user = await User.create({ username: 'testuser', email: 'test@example.com', password: 'password', role: 'Student' });

        // Generate a valid token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Make request to logout
        const response = await request(app)
            .post('/api/auth/logout')
            .set('Cookie', ['token=' + token]);

        expect(response.status).toBe(200);
    });

});
