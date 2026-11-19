
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    location_id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    building_type: {
        type: String,
        required: true
    },

    waste_bin_count: {
        type: Number,
        required: true
    },

    area: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    'Location',
    locationSchema,
    'locations'
);
