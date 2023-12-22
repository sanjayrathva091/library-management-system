// server/routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res, next) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        next(error);
    }
});

// Get a specific book
router.get('/:id', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        res.json(book);
    } catch (error) {
        next(error);
    }
});

// Add a new book
router.post('/', async (req, res, next) => {
    const { name, author, availability } = req.body;

    try {
        const newBook = new Book({ name, author, availability });
        const savedBook = await newBook.save();
        res.json(savedBook);
    } catch (error) {
        next(error);
    }
});

// Update a book
router.put('/:id', async (req, res, next) => {
    const { name, author, availability } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { name, author, availability },
            { new: true }
        );
        res.json(updatedBook);
    } catch (error) {
        next(error);
    }
});

// Delete a book
router.delete('/:id', async (req, res, next) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
