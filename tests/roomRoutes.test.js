const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Room = require('../models/room');

describe('Room Routes', () => {
    let adminToken;

    // Clear the database and create a test admin user before running the tests
    beforeAll(async () => {
        // Clear the database
        await Room.deleteMany();
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

    it('should create a new room', async () => {
        const roomData = { name: '101', capacity: 50, bookedSlots: [{ startTime: '2024-03-19T17:42:44.799+00:00', endTime: '2024-03-19T17:42:44.799+00:00' }] };

        const response = await request(app)
            .post('/api/rooms')
            .set('Cookie', ['token=' + adminToken])
            .send(roomData);

        expect(response.status).toBe(201);
    });

    it('should fetch existing rooms', async () => {
        await Room.create({ name: '101', capacity: 50, bookedSlots: [{ startTime: '2024-03-19T17:42:44.799+00:00', endTime: '2024-03-19T17:42:44.799+00:00' }] });
        await Room.create({ name: '102', capacity: 30, bookedSlots: [{ startTime: '2024-03-19T17:42:44.799+00:00', endTime: '2024-03-19T17:42:44.799+00:00' }] });

        const response = await request(app)
            .get('/api/rooms')
            .set('Cookie', ['token=' + adminToken]);

        expect(response.status).toBe(200);
    });

    it('should fetch a room by ID', async () => {
        const newRoom = await Room.create({ name: '101', capacity: 50, bookedSlots: [{ startTime: '2024-03-19T17:42:44.799+00:00', endTime: '2024-03-19T17:42:44.799+00:00' }] });

        const response = await request(app)
            .get(`/api/rooms/${newRoom._id}`);

        expect(response.status).toBe(200);
    });

    it('should update a room by ID', async () => {
        const newRoom = await Room.create({ name: '101', capacity: 50, bookedSlots: [{ startTime: '2024-03-19T17:42:44.799+00:00', endTime: '2024-03-19T17:42:44.799+00:00' }] });

        const updatedData = { name: '102', capacity: 40, bookedSlots: [{ startTime: '2024-03-19T17:42:44.799+00:00', endTime: '2024-03-19T17:42:44.799+00:00' }] };

        const response = await request(app)
            .put(`/api/rooms/${newRoom._id}`)
            .set('Cookie', ['token=' + adminToken]) // Set the admin token in the cookie
            .send(updatedData);

        expect(response.status).toBe(200);
    });

    it('should delete a room by ID', async () => {
        const newRoom = await Room.create({ name: '101', capacity: 50, bookedSlots: [{ startTime: '2024-03-19T17:42:44.799+00:00', endTime: '2024-03-19T17:42:44.799+00:00' }] });

        const response = await request(app)
            .delete(`/api/rooms/${newRoom._id}`)
            .set('Cookie', ['token=' + adminToken]); // Set the admin token in the cookie

        expect(response.status).toBe(200);
    });
});