const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Email and password required' });
    if(await User.findOne({ email })) return res.status(400).json({ message: 'Email exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash, role });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn:'8h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch(err){ res.status(500).json({ message: err.message }); }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn:'8h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch(err){ res.status(500).json({ message: err.message }); }
});

module.exports = router;
