const Booking = require('../models/Booking');
const Event = require('../models/Event.model'); // Assuming you have an Event model

exports.bookEvent = async (req, res) => {
  try {
    const { eventId, package, price, location, date, time } = req.body;
    const userId = req.user._id; // Get user ID from auth middleware

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Create a new booking
    const booking = new Booking({ userId, eventId, package, price, location, date, time });
    await booking.save();

    res.status(201).json({ message: 'Event booked successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
