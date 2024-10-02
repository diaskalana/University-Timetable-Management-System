const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./utils/errorHandlers');
const logger = require('./utils/logger');
const dotenv = require('dotenv');
dotenv.config();


// Import routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const roomRoutes = require('./routes/roomRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

// Middleware for logging requests
app.use((req, res, next) => {
    logger(`${req.method} ${req.url}`);
    next();
});

// Middleware to parse cookies
app.use(cookieParser());

// Enable JSON body parsing
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/notifications', notificationRoutes);

// Connect to MongoDB
connectDB();

// Other app configurations and middleware setup...
// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;