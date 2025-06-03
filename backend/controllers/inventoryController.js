// server/controllers/inventoryController.js
const Product = require('../models/Product');

const getInventory = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

const updateInventory = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity === undefined) return res.status(400).json({ error: 'Quantity is required' });

    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.id },
      { quantity },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inventory' });
  }
};

module.exports = {
  getInventory,
  updateInventory,
};
