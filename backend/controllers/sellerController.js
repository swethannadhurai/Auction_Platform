
const Seller = require('../models/Seller');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const registerSeller = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await Seller.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Seller already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const seller = await Seller.create({ name, email, password: hashed, role: 'seller' });

    const token = createToken(seller);
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ message: 'Seller registered' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

const loginSeller = async (req, res) => {
  const { email, password } = req.body;
  try {
    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, seller.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = createToken(seller);
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

const logoutSeller = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

const createProduct = async (req, res) => {
  const { name, price, quantity, category } = req.body;
  try {
    const product = await Product.create({ name, price, quantity, category, seller: req.user.id });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id, seller: req.user.id });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  registerSeller,
  loginSeller,
  logoutSeller,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};