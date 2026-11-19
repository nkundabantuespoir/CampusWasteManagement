const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// CRUD routes
app.use('/api/users', userRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/reports', reportRoutes);

// User CRUD routes
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Campus Waste Management API is running!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully!');

        // Start server after database connection
        app.listen(process.env.PORT, () => {
            console.log(`Campus Waste Management Server Running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB Connection Failed:', error.message);
    });
