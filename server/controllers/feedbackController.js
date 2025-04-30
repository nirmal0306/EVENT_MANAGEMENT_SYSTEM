const Feedback = require("../models/Feedback");

// const submitFeedback = async (req, res) => {
//   const { username, feedback } = req.body;

//   if (!username || !feedback) {
//     return res.status(400).json({ msg: "Username and feedback are required" });
//   }

//   try {
//     const newFeedback = new Feedback({ username, feedback });
//     await newFeedback.save();
//     res.status(201).json({ msg: "Feedback submitted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error submitting feedback" });
//   }
// };
const submitFeedback = async (req, res) => {
  const { username, feedback } = req.body;

  if (!username || !feedback) {
    return res.status(400).json({ msg: "Username and feedback are required" });
  }

  try {
    const newFeedback = new Feedback({ username, feedback });
    await newFeedback.save();
    res.status(201).json({ msg: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { submitFeedback };
