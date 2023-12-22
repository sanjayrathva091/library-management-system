// server/routes/transactions.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get details of a specific transaction
router.get('/:id', async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        res.json(transaction);
    } catch (error) {
        next(error);
    }
});

// Issue a book to a user
router.post('/issue/:bookId/:userId', async (req, res, next) => {
    const { bookId, userId } = req.params;

    try {
        // Step 1: Check if the book is available
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (!book.availability) {
            return res.status(400).json({ message: 'Book is not available for issuance' });
        }

        // Step 2: Update the book's availability status
        book.availability = false;
        await book.save();

        // Step 3: Create a new transaction record
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Set the due date as 30 days from now
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);

        const transaction = new Transaction({
            user: userId,
            book: bookId,
            dueDate,
            transactionType: 'borrowed',
        });

        await transaction.save();

        // Step 4: Return the relevant information about the issued transaction
        res.json({
            message: 'Book issued successfully',
            transaction: {
                user: user.username,
                book: book.name,
                dueDate: dueDate.toISOString(),
                transactionType: 'borrowed',
            },
        });
    } catch (error) {
        next(error);
    }
});

// Return a book from a user
router.post('/return/:bookId/:userId', async (req, res, next) => {
    const { bookId, userId } = req.params;

    try {
        // Step 1: Check if the book is currently borrowed by the specified user
        const transaction = await Transaction.findOne({
            user: userId,
            book: bookId,
            transactionType: 'borrowed',
        });

        if (!transaction) {
            return res.status(400).json({ message: 'Book is not currently borrowed by the specified user' });
        }

        // Step 2: Update the book's availability status to indicate it has been returned
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.availability = true;
        await book.save();

        // Step 3: Update the corresponding transaction record to mark the book as returned
        transaction.transactionType = 'returned';
        await transaction.save();

        // Step 4: Return the relevant information about the returned transaction
        res.json({
            message: 'Book returned successfully',
            transaction: {
                user: userId,
                book: book.name,
                transactionType: 'returned',
            },
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
