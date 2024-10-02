const Timetable = require('../models/timetable');

// Create a new class session
exports.createSession = async (req, res) => {
    try {
        const session = await Timetable.create(req.body);
        res.status(201).json({ session });
    } catch (error) {
        console.error('Error creating session:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all class sessions
exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await Timetable.find();
        res.json({ sessions });
    } catch (error) {
        console.error('Error fetching sessions:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get session by ID
exports.getSessionById = async (req, res) => {
    try {
        const session = await Timetable.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.json({ session });
    } catch (error) {
        console.error('Error fetching session:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update session by ID
exports.updateSessionById = async (req, res) => {
    try {
        const session = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.json({ session });
    } catch (error) {
        console.error('Error updating session:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete session by ID
exports.deleteSessionById = async (req, res) => {
    try {
        const session = await Timetable.findByIdAndDelete(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.json({ message: 'Session deleted successfully' });
    } catch (error) {
        console.error('Error deleting session:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
