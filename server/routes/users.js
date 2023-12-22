// server/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        next(error);
    }
})

// Get a specific user
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

// Update a specific user
router.put('/:id', async (req, res, next) => {
    const { username, name, email, password, contactNumber } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 8);

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, name, email, hashedPassword, contactNumber },
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

// Delete a specific user
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id, { returnDocument: true });
        return res.json(user);
    } catch (error) {
        next(error);
    }
});

// Get transaction history for a user
router.get('/:id/transactions', async (req, res, next) => {
    // Implement logic to get transaction history for a user
    // ...

    try {
        res.json(/* transaction history data */);
    } catch (error) {
        next(error);
    }
});

// User Signup
router.post('/signup', [
    body('username').notEmpty().withMessage('Username is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('contactNumber').notEmpty().withMessage('Contact number is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res, next) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        password: hashedPassword
    });

    // Save the user to the database
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
});

// User Signin
router.post('/signin', async (req, res, next) => {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password is correct
    try {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token
        res.json({ token });
    } catch (error) {
        next(error);
    }


});

module.exports = router;
