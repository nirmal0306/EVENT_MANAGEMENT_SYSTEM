const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const User = require('../models/User');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route("/").get((req, res) => {
  User.find()
    .then((User) => res.json(User))
    .catch((err) => res.status(400).json("Error: " + err));
});
// Get Data
// router.route("/:id").get((req, res) => {
//   User.findById(req.params.id)
//     .then((User) => res.json(User))
//     .catch((err) => res.status(400).json("Error: " + err));
// });
router.get('/userdetails/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user/:username/bookings', async (req, res) => {
  try {
      const user = await User.findOne({ username: req.params.username });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const bookings = await Booking.find({ user: user._id }).populate('event').populate('user');
      res.status(200).json(bookings);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
