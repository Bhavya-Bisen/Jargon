const mongoose = require('../config/mongo');

const feedbackSchema = new mongoose.Schema({
  userId: String,
  feedback: String,
  timestamp: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
