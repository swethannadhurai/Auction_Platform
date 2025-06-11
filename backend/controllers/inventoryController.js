const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');
const AuctionItem = require("../models/AuctionItem");

const listProductForAuction = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { startTime, endTime, startingBid } = req.body;

    if (!productId || !startTime || !endTime || !startingBid) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({ error: "End time must be after start time" });
    }

    const product = await Product.findOne({ _id: productId, seller: req.user._id });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const existingAuction = await AuctionItem.findOne({ product: productId });
    if (existingAuction) {
      return res.status(400).json({ error: "Auction already exists for this product" });
    }

    const auction = await AuctionItem.create({
      product: productId,
      seller: req.user._id,
      title: product.name,
      description: product.description,
      image: product.image,
      startingBid: Number(startingBid),
      startDate: new Date(startTime),   
      endDate: new Date(endTime),
    });

    res.status(201).json(auction);
  } catch (error) {
    console.error("❌ Error creating auction:", error.message);
    res.status(500).json({ error: "Failed to create auction" });
  }
};


const getInventory = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, seller: req.user._id });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};


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
      seller: req.user._id, 
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};


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
  listProductForAuction,
  getInventory,
  getProductById,
  createProduct,
  updateInventory,
  deleteProduct,
};

