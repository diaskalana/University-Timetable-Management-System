const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const Notification = require('../models/notification');
const User = require('../models/user');

describe('Notification Routes', () => {
    let adminToken;

    // Before running the tests, create a test admin user and obtain a token
    beforeAll(async () => {
        await User.deleteMany();

        // Create a test admin user
        await User.create({ username: 'admin', email: 'testdrivethenet@gmail.com', password: 'adminpassword', role: 'Admin' });

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
        await Notification.deleteMany();
    });

    it('should create a new notification', async () => {
        const notificationData = { message: 'New Notification' };

        const response = await request(app)
            .post('/api/notifications')
            .set('Cookie', ['token=' + adminToken]) // Set the admin token in the cookie
            .send(notificationData);

        expect(response.status).toBe(201);
    });

    it('should fetch all notifications', async () => {
        await Notification.create({ message: 'New Notification 1' });
        await Notification.create({ message: 'New Notification 2' });

        const response = await request(app)
            .get('/api/notifications');

        expect(response.status).toBe(200);
    });

    it('should fetch a notification by ID', async () => {
        const newNotification = await Notification.create({ message: 'Notification message' });

        const response = await request(app)
            .get(`/api/notifications/${newNotification._id}`);

        expect(response.status).toBe(200);
    });

    it('should send a notification', async () => {
        await User.deleteMany();

        await User.create({ username: 'admin', email: 'testdrivethenet@gmail.com', password: 'adminpassword', role: 'Admin' });

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


        const newNotification = await Notification.create({ message: 'Notification message', recipients: [user._id] });

        const response = await request(app)
            .post(`/api/notifications/${newNotification._id}/send`)
            .set('Cookie', ['token=' + adminToken]) // Set the admin token in the cookie

        expect(response.status).toBe(200);
    }, 30000);
});
