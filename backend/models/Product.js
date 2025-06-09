const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  image: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

