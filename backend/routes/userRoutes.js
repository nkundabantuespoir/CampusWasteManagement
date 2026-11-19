
const express = require('express');
const router = express.Router();

const User = require('../models/User');

// 1. CREATE USER
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            message: 'User created successfully',
            data: newUser
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// 2. READ ALL USERS
router.get('/', async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// 3. UPDATE USER
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// 4. DELETE USER
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(
            req.params.id
        );

        if (!deletedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User deleted successfully'
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;
