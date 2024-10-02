const Resource = require('../models/resource');

// Create a new resource
exports.createResource = async (req, res) => {
    try {
        const resource = await Resource.create(req.body);
        res.status(201).json({ resource });
    } catch (error) {
        console.error('Error creating resource:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all resources
exports.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json({ resources });
    } catch (error) {
        console.error('Error fetching resources:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
