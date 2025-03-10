const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    question: {
        type: String,
        required: false,
        unique: true
    },
    options: {
        type: [String],
        required: false
    },
    correctOption: {
        type: Number,
        required: false
    },
    speech: {
        type: String,
        required: false
    }
});

const Question = mongoose.model('Question', schema);

module.exports = Question;
