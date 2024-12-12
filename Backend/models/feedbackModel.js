const mongoose = require('../config/mongo');

const feedbackSchema = new mongoose.Schema({
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
