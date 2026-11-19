const express = require('express');
const router = express.Router();

const WasteReport = require('../models/WasteReport');

// CREATE WASTE REPORT
router.post('/', async (req, res) => {
    try {
        const report = await WasteReport.create(req.body);
        res.status(201).json({
            message: 'Waste report created successfully',
            data: report
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ WASTE REPORTS
router.get('/', async (req, res) => {
    try {
        const reports = await WasteReport.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE WASTE REPORT
router.put('/:id', async (req, res) => {
    try {
        const report = await WasteReport.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!report) {
            return res.status(404).json({
                message: 'Waste report not found'
            });
        }

        res.json({
            message: 'Waste report updated successfully',
            data: report
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE WASTE REPORT
router.delete('/:id', async (req, res) => {
    try {
        const report = await WasteReport.findByIdAndDelete(
            req.params.id
        );

        if (!report) {
            return res.status(404).json({
                message: 'Waste report not found'
            });
        }

        res.json({ message: 'Waste report deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
