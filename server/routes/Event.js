const router = require("express").Router();
const { Event, getNextSequenceValue } = require("../models/Event.model");
const Booking = require("../models/Booking");
const authenticateJWT = require('../middleware/authenticateJWT');
const { submitFeedback } = require("../controllers/feedbackController");

router.post('/feedback', submitFeedback);


router.route("/").get((req, res) => {
  Event.find()
    .then((Event) => res.json(Event))
    .catch((err) => res.status(400).json("Error: " + err));
});
// server/routes/Event.js

// Get Data
router.route("/:id").get((req, res) => {
  Event.findById(req.params.id)
    .then((Event) => res.json(Event))
    .catch((err) => res.status(400).json("Error: " + err));
});
// Add an event
router.post('/add', async (req, res) => {
  try {
    const nextEventID = await getNextSequenceValue('eventID');
    const newEvent = new Event({
      EventID: nextEventID,
      EventName: req.body.EventName,
      Category: req.body.Category,
      G_Pprice: req.body.G_Pprice,
      S_Pprice: req.body.S_Pprice,
      P_Pprice: req.body.P_Pprice,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});




//Delete Data

router.route("/:id").delete((req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json("Event deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update data
router.route("/update/:id").post((req, res) => {
  Event.findById(req.params.id)
    .then((Event) => {
      Event.EventID = req.body.EventID;
      Event.EventName = req.body.EventName;
      Event.Category = req.body.Category;
      Event.G_Pprice = req.body.G_Pprice;
      Event.S_Pprice = req.body.S_Pprice;
      Event.P_Pprice = req.body.P_Pprice;

      Event.save()
        .then(() => res.json("Event updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Book an event
router.post('/book', async (req, res) => {
  const { eventId, eventName, category, package, price, location, date, time, paymentMethod, upiApp, username } = req.body;

  try {
    // const existingBooking = await Booking.findOne({ user: username, event: eventId, eventName: eventName });
    const existingBooking = await Booking.findOne({
      username: username, // Ensure field names match your model schema
      eventId: eventId,
      eventName: eventName,
      category: category,
      package: package,
      price: price,
      location: location,
      date: date,
      time: time,
      paymentMethod,  
      upiApp: upiApp || null
    });
        if (existingBooking) {
            return res.status(400).json({ message: 'You have already booked this event.' });
        }
    const newBooking = new Booking({
      username,
      eventId,
      eventName,
      category,
      package,
      price,
      location,
      date,
      time,
      paymentMethod,  
      upiApp: upiApp || null
    });

    await newBooking.save();

    res.status(200).json({ message: 'Event booked successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to book event' });
  }
});

// router.post('/book', async (req, res) => {
//   const { eventId, username } = req.body;

//   try {
//     const existingBooking = await Booking.findOne({ user: username, event: eventId });

//         if (existingBooking) {
//             return res.status(400).json({ message: 'You have already booked this event.' });
//         }
//     const newBooking = new Booking({
//       username,
//       eventId
//     });

//     await newBooking.save();

//     res.status(200).json({ message: 'Event booked successfully!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to book event' });
//   }
// });

module.exports = router;
