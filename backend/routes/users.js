const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash').populate('assignedPatients','name email');
  res.json(user);
});

router.put('/me', auth, async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { profile: updates.profile, name: updates.name }, { new: true }).select('-passwordHash');
  res.json(user);
});

router.get('/assigned', auth, async (req, res) => {
  if(req.user.role !== 'provider') return res.status(403).json({ message: 'Not provider' });
  const user = await User.findById(req.user.id).populate('assignedPatients');
  res.json(user.assignedPatients || []);
});

module.exports = router;
