const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    }, 
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    score: { type: Number, default: 0 },
    loginStreak: { type: Number, default: 0 },
    lastLogin: { type: Date, default: null }
});

const User = mongoose.model('User', schema);

module.exports = User;
