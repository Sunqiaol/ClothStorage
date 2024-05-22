const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Ensure this path is correct based on your project structure

router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch all users from the database
        res.status(200).json(users); // Send the users as a JSON response
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
});

router.post('/addUser', async (req, res) => {
    const { firebaseId, email, role } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const user = await User.create({ firebaseId, email, role });
        res.status(201).json({ user });
    } catch (error) {
        console.error('Error adding user:', error); // Log the full error
        res.status(500).json({ error: 'An error occurred while adding the user', details: error.message });
    }
});


module.exports = router;
