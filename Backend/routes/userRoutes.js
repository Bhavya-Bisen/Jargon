const express = require('express');
const { getUsers } = require('../models/userModel');
const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

module.exports = router;
