const express = require('express');
const router = express.Router();

const Location = require('../models/Location');

// CREATE LOCATION
router.post('/', async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.status(201).json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ LOCATIONS
router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE LOCATION
router.put('/:id', async (req, res) => {
    try {
        const location = await Location.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE LOCATION
router.delete('/:id', async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);

        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
