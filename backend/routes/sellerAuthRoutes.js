const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const router = express.Router();

// @route   POST /api/seller/auth/register
// @desc    Register new seller
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = new User({ name, email, password: hashedPassword, role: 'seller' });
    await seller.save();

    generateToken(res, seller._id);
    res.status(201).json({ message: 'Seller registered successfully' });
  } catch (error) {
    console.error('Seller registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// @route   POST /api/seller/auth/login
// @desc    Login seller
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const isMatch = user && await bcrypt.compare(password, user.password);

    if (!user || !isMatch || user.role !== 'seller') {
      return res.status(401).json({ error: 'Invalid credentials or not a seller' });
    }

    generateToken(res, user._id);
    res.json({ message: 'Logged in as seller' });
  } catch (error) {
    console.error('Seller login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// @route   POST /api/seller/auth/logout
// @desc    Logout seller
router.post('/logout', (req, res) => {
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
