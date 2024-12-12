const express = require('express');
const Feedback = require('../models/feedbackModel');
const { indexFeedback, searchFeedback } = require('../models/searchModel');
const router = express.Router();

router.post('/feedback', async (req, res) => {
});

router.get('/feedback/search', async (req, res) => {
});

module.exports = router;
