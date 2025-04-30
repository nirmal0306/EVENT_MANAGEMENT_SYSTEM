// // const mongoose = require('mongoose');

// // const bookingSchema = new mongoose.Schema({
// //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //   eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event.model', required: true },
// //   bookingDate: { type: Date, default: Date.now }
// // });

// // const Booking = mongoose.model('Booking', bookingSchema);
// // module.exports = Booking;
// // const mongoose = require('mongoose');

// // const bookingSchema = new mongoose.Schema({
// //   event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event.model', required: true },
// //   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //   bookingDate: { type: Date, default: Date.now }
// //   // Add additional fields if necessary
// // });

// // module.exports = mongoose.model('Booking', bookingSchema);
// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event.model', required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   bookingDate: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Booking', bookingSchema);
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  username: {
    type: String,
    ref: 'User',
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event.model', // Assuming you have an Event model
    required: true
  },
  eventName: {
    type: String,
    ref: 'Event.model', // Assuming you have an Event model
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true, // Mark as required if necessary
  },
  upiApp: {
    type: String,
    required: false, // This is optional, as not all payment methods use UPI apps
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
