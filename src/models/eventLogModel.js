const mongoose = require('mongoose');

const eventLogSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date, 
        required: true
    },
    event_name: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    }
    });

    module.exports = mongoose.model('EventLog', eventLogSchema);
