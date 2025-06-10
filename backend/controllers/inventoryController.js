const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

// GET all products for a seller
const getInventory = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

// GET a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, seller: req.user._id });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// CREATE new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = new Product({
      name,
      description,
      price,
      image: imagePath,
      seller: req.user._id, // ✅ Fixed here
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// UPDATE product
const updateInventory = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    const updateData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price }),
      ...(quantity !== undefined && { quantity }),
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user._id }, // ✅ Fixed here
      updateData,
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inventory' });
  }
};

// DELETE product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, seller: req.user._id }); // ✅ Fixed here
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.image) {
      const filePath = path.join(__dirname, '..', 'public', product.image);
      fs.unlink(filePath, (err) => {
        if (err) console.warn("Failed to delete image file:", err.message);
      });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  getInventory,
  getProductById,
  createProduct,
  updateInventory,
  deleteProduct,
};

