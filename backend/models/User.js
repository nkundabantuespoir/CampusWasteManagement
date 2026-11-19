
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema, 'users');
