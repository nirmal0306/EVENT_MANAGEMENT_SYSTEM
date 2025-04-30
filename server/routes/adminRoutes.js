const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Admin login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { id: admin.id, username: admin.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch admin details route
router.get('/admindetails/:adminUsername', async (req, res) => {
    try {
        const admin = await Admin.findOne({ username: req.params.adminUsername }); // Fixed query
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({
            adminUsername: admin.username,
            password: admin.password, // Avoid sending the password in real applications
            // Add more fields if needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
