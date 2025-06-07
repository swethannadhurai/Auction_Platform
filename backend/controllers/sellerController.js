const Seller = require('../models/Seller');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken'); 


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


const registerSeller = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existing = await Seller.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Seller already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const seller = await Seller.create({ name, email, password: hashed, role: 'seller' });

    generateToken(res, seller);
    res.status(201).json({ message: 'Seller registered' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};



const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, seller.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    generateToken(res, seller);

    const sellerData = {
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      role: seller.role,
    };

    res.json({ user: sellerData, role: seller.role });  
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: 'Login failed' });
  }
};




const getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.user._id).select("-password");
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const logoutSeller = (req, res) => {
  
  try {
		res.clearCookie("jwt", {
			httpOnly: true,
			secure: true,
			sameSite: "None",
			expires: new Date(0),
		});
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.error("Logout error:", error);
		res.status(500).json({ message: "Internal server error" });
	}

};

module.exports = {
  registerSeller,
  loginSeller,
  logoutSeller,
  getSellerProfile,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
