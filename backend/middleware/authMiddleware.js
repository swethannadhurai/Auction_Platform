const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Seller = require("../models/Seller");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    let user = await User.findById(decoded._id).select("-password");
    if (!user) {
      user = await Seller.findById(decoded._id).select("-password");
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    req.role = decoded.role;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};


const sellerOnly = (req, res, next) => {
  if (req.role !== "seller") {
    return res.status(403).json({ message: "Access denied: Sellers only" });
  }
  next();
};

module.exports = { authMiddleware, sellerOnly };

