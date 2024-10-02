const Room = require('../models/room');
const Resource = require('../models/resource');

// Create a new room
exports.createRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(201).json({ room });
    } catch (error) {
        console.error('Error creating room:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json({ rooms });
    } catch (error) {
        console.error('Error fetching rooms:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get room by ID
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ room });
    } catch (error) {
        console.error('Error fetching room:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update room by ID
exports.updateRoomById = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ room });
    } catch (error) {
        console.error('Error updating room:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete room by ID
exports.deleteRoomById = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Error deleting room:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
