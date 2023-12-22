// server/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get a specific user
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
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

module.exports = router;
