const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const router = express.Router();

// POST /api/seller/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ error: 'Email already in use' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const seller = new User({ name, email, password: hashedPassword, role: 'seller' });
  await seller.save();

  generateToken(res, seller._id);
  res.status(201).json({ message: 'Seller registered successfully' });
});

// POST /api/seller/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isMatch = user && await bcrypt.compare(password, user.password);

  if (!user || !isMatch || user.role !== 'seller') {
    return res.status(401).json({ error: 'Invalid credentials or not a seller' });
  }

  generateToken(res, user._id);
  res.json({ message: 'Logged in as seller' });
});

// POST /api/seller/logout
router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;

