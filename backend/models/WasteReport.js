const mongoose = require('mongoose');

const wasteReportSchema = new mongoose.Schema({
    report_id: {
        type: String,
        required: true
    },

    reported_by: {
        type: String,
        required: true
    },

    location_id: {
        type: String,
        required: true
    },

    waste_type: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    date_reported: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model(
    'WasteReport',
    wasteReportSchema,
    'waste_reports'
);
