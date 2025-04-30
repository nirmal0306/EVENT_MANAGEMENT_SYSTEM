// // routes/booking.js or wherever your booking logic is handled
// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');
// const User = require('../models/User');

// // Get all bookings for a specific user by username
// router.route("/").get((req, res) => {
//     Booking.find()
//       .then((Booking) => res.json(Booking))
//       .catch((err) => res.status(400).json("Error: " + err));
//   });

//   router.route("/:id").get((req, res) => {
//     Booking.findById(req.params.id)
//       .then((Booking) => res.json(Booking))
//       .catch((err) => res.status(400).json("Error: " + err));
//   });


// router.get("/find/:username/:eventId", async (req, res) => {
//     try {
//         const { username, eventId } = req.params;
//         const booking = await Booking.findOne({ username, eventId });

//         if (!booking) {
//             return res.status(404).json({ message: "Booking not found" });
//         }

//         res.status(200).json(booking);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching booking", error });
//     }
// });

// // Delete booking by ID
// router.delete("/cancel/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await Booking.findByIdAndDelete(id);

//         if (!result) {
//             return res.status(404).json({ message: "Booking not found" });
//         }

//         res.status(200).json({ message: "Booking canceled successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error canceling booking", error });
//     }
// });
// router.get('/booking/:username', async (req, res) => {
//     try {
//         const user = await User.findOne({ username: req.params.username });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const bookings = await Booking.find({ user: user._id }).populate('Booking').populate('user');
//         res.status(200).json(bookings);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
const cron = require('node-cron');

// Get all bookings
router.route("/").get((req, res) => {
    Booking.find()
      .then((bookings) => res.json(bookings))
      .catch((err) => res.status(400).json("Error: " + err));
});

// Get a booking by ID
router.route("/:id").get((req, res) => {
    Booking.findById(req.params.id)
      .then((booking) => res.json(booking))
      .catch((err) => res.status(400).json("Error: " + err));
});


// Get a specific booking by username and eventId
router.get("/find/:username/:eventId", async (req, res) => {
    try {
        const { username, eventId } = req.params;
        const booking = await Booking.findOne({ username, eventId });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Error fetching booking", error });
    }
});

// Delete a booking by ID
router.delete("/cancel/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Booking.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking canceled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error canceling booking", error });
    }
});

// Get all bookings for a user by username
router.get('/booking/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const bookings = await Booking.find({ user: user._id }).populate('Booking').populate('user');
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Schedule a cron job to delete expired bookings every day at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        const now = new Date();
        const result = await Booking.deleteMany({ date: { $lt: now } });
        console.log(`Deleted ${result.deletedCount} expired bookings`);
    } catch (error) {
        console.error("Error deleting expired bookings:", error);
    }
});

module.exports = router;
