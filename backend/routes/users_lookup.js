const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// GET /api/users?email=...
router.get('/', auth, async (req, res) => {
  const { email } = req.query;
  if(!email) return res.status(400).json({ message: 'email required' });
  const user = await User.findOne({ email }).select('_id name email role');
  if(!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
});

module.exports = router;
