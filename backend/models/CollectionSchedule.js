
const mongoose = require('mongoose');

const collectionScheduleSchema = new mongoose.Schema({
    schedule_id: {
        type: String,
        required: true
    },

    location_id: {
        type: String,
        required: true
    },

    assigned_to: {
        type: String,
        required: true
    },

    collection_date: {
        type: Date,
        required: true
    },

    collection_time: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    'CollectionSchedule',
    collectionScheduleSchema,
    'collection_schedules'
);
