const express = require('express');
const Feedback = require('../models/feedbackModel');
const { indexFeedback, searchFeedback } = require('../models/searchModel');
const router = express.Router();

router.post('/feedback', async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  await indexFeedback(req.body); // Optional: Index feedback in Elasticsearch
  res.json(feedback);
});

router.get('/feedback/search', async (req, res) => {
  const results = await searchFeedback(req.query.q);
  res.json(results);
});

module.exports = router;
