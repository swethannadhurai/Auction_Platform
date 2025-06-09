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

    let user;
    if (decoded.role === 'user') {
      user = await User.findById(decoded.id).select("-password");
    } else if (decoded.role === 'seller') {
      user = await Seller.findById(decoded.id).select("-password");
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user._id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token is not valid" });
  }
};


const sellerOnly = (req, res, next) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Access denied: Sellers only" });
  }
  next();
};

module.exports = { authMiddleware, sellerOnly };
