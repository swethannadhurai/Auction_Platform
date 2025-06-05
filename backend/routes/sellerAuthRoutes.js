const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Seller = require("../models/Seller");

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Temporary: Register Seller (for testing)
router.post("/register-seller", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: "Seller already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSeller = new Seller({
      name,
      email,
      password: hashedPassword,
      role: "seller"
    });

    await newSeller.save();
    res.status(201).json({ message: "Seller registered successfully" });
  } catch (error) {
    console.error("Error registering seller:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Buyer login
router.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ message: "User login successful", role: "user" });
});

// Seller login
router.post("/login-seller", async (req, res) => {
  const { email, password } = req.body;

  const seller = await Seller.findOne({ email });
  if (!seller || !(await bcrypt.compare(password, seller.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(seller);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: "Seller login successful", role: "seller" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router;

