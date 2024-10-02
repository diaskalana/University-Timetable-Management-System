const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const Resource = require('../models/resource');
const User = require('../models/user');

describe('Resource Routes', () => {
    // Clear the database before running the tests
    beforeEach(async () => {
        await Resource.deleteMany();
    });

    it('should create a new resource', async () => {

        await User.deleteMany();

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

        const resourceData = { name: 'Projector' };

        const response = await request(app)
            .post('/api/resources')
            .set('Cookie', ['token=' + adminToken]) // Set the admin token in the cookie
            .send(resourceData);

        expect(response.status).toBe(201);
    });

    it('should fetch existing resources', async () => {
        await Resource.create({ name: 'Projector' });
        await Resource.create({ name: 'Laptop' });

        const response = await request(app).get('/api/resources');

        expect(response.status).toBe(200);
    });

});
