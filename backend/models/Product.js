const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true, 
    min: 0
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0
  },
  image: {
    type: String
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);


