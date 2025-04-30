// const router = require("express").Router();
// const { Event, getNextSequenceValue } = require("../models/Event.model");
// const Booking = require("../models/Booking");
// const authenticateJWT = require('../middleware/authenticateJWT');

// router.route("/").get((req, res) => {
//     Booking.find()
//       .then((Booking) => res.json(Booking))
//       .catch((err) => res.status(400).json("Error: " + err));
//   });

// router.post('/book' , async (req, res) => {
//     try {
//       const { eventId } = req.body;
//       // const userId = req.user.id;
//       // console.log(req.user);
//       // const { eventId } = req.body;
//       const userId = req.user ? req.user.id : null;
  
//       if (!userId) {
//         return res.status(401).json({ message: 'Unauthorized user.' });
//       }
  
//       const event = await Event.findById(eventId);
//       if (!event) return res.status(404).json({ message: 'Event not found' });
  
//       const newBooking = new Booking({ event: eventId, user: userId });
//       await newBooking.save();
  
//       res.status(200).json({ message: 'Event booked successfully!' });
//     } catch (error) {
//       console.log("error1");
//       console.error('Error booking event:', error);
//       res.status(500).json({ message: 'Failed to book event.' });
//     }
//   });
  
//   module.exports = router;