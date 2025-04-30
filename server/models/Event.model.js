// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// //Databass Schema

// const EventSchema = new Schema(
//   {
//     EventID: { type: Number, required: true, unique: true},
//     EventName: { type: String, required: true },
//     Category: { type: String, required: true },
//     Content: { type: String, required: true },
//     Packages: { type: String, required: true },
//     G_Pprice: { type: String, required: true },
//     S_Pprice: { type: String, required: true },
//     P_Pprice: { type: String, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Event = mongoose.model("Event", EventSchema);

// module.exports = Event;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Sequence Schema
const SequenceSchema = new Schema({
  model: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 }
});

const Sequence = mongoose.model('Sequence', SequenceSchema);

// Event Schema
const EventSchema = new Schema(
  {
    EventID: { type: Number, required: true, unique: true },
    EventName: { type: String, required: true },
    Category: { type: String, required: true },
    G_Pprice: { type: String, required: true },
    S_Pprice: { type: String, required: true },
    P_Pprice: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', EventSchema);

async function getNextSequenceValue(sequenceName) {
  const sequence = await Sequence.findOneAndUpdate(
    { model: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return sequence.seq;
}

module.exports = { Event, getNextSequenceValue };
