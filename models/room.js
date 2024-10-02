const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    resources: [String], // Array of resource names
    bookedSlots: [
        {
            startTime: {
                type: Date,
                required: true
            },
            endTime: {
                type: Date,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Room', roomSchema);
