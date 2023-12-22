// server/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        default: true,
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
