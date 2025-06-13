// authMiddleware.js
const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");
const User   = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // First look for a seller, then a normal user
    const user =
      (await Seller.findById(decoded.id).select("-password")) ||
      (await User.findById(decoded.id).select("-password"));

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;          // the full document
    req.role = user.role;     // ALWAYS from DB
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

const sellerOnly = (req, _res, next) => {
  if (req.role !== "seller") {
    return _res.status(403).json({ message: "Access denied: Sellers only" });
  }
  next();
};

module.exports = { authMiddleware, sellerOnly };
