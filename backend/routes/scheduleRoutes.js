const express = require('express');
const router = express.Router();

const CollectionSchedule = require('../models/CollectionSchedule');

// CREATE SCHEDULE
router.post('/', async (req, res) => {
    try {
        const schedule = await CollectionSchedule.create(req.body);
        res.status(201).json(schedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ SCHEDULES
router.get('/', async (req, res) => {
    try {
        const schedules = await CollectionSchedule.find();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE SCHEDULE
router.put('/:id', async (req, res) => {
    try {
        const schedule = await CollectionSchedule.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!schedule) {
            return res.status(404).json({
                message: 'Schedule not found'
            });
        }

        res.json(schedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE SCHEDULE
router.delete('/:id', async (req, res) => {
    try {
        const schedule = await CollectionSchedule.findByIdAndDelete(
            req.params.id
        );

        if (!schedule) {
            return res.status(404).json({
                message: 'Schedule not found'
            });
        }

        res.json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
