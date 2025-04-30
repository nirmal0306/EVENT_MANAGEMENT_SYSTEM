// server/routes/auth.js
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
});

// Login Route
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({ token });
    } catch (error) {
      res.status(400).json({ message: 'Error logging in', error });
    }
  });
  
  const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
  
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401); // Unauthorized
    }
  };
  
  // Apply this middleware to routes that require authentication
 // Route to book an event
router.post('/book', authenticateJWT, async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user._id; // Extracted from the JWT token

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Create a new booking
    const newBooking = new Booking({
      userId: userId,
      eventId: eventId,
    });

    // Save the booking to the database
    await newBooking.save();

    res.status(201).json({ message: 'Event booked successfully', booking: newBooking });
  } catch (error) {
    console.error('Error booking event:', error);
    res.status(500).json({ message: 'Failed to book event' });
  }
});
module.exports = router;
