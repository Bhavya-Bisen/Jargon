const Feedback = require('../models/feedbackModel');  // MongoDB model
const { indexFeedback } = require('../models/searchModel');  // Elasticsearch model (optional)

// Submit feedback
const submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();  // Save feedback to MongoDB

    // Optional: Index feedback in Elasticsearch for searching
    await indexFeedback(req.body);

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
};

// Search feedback (optional, using Elasticsearch)
const searchFeedback = async (req, res) => {
  try {
    const results = await searchFeedback(req.query.q);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching feedback:", error);
    res.status(500).json({ message: "Failed to search feedback" });
  }
};

module.exports = { submitFeedback, searchFeedback };
