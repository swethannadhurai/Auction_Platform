const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
	const token = req.cookies?.jwt;

	if (!token) {
		return res.status(401).json({ message: "Not authorized, no token" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id).select("-password");
		next();
	} catch (error) {
		console.error(error);
		res.status(401).json({ message: "Token is not valid" });
	}
};

const sellerOnly = (req, res, next) => {
  if (req.user.role !== 'seller') return res.status(403).json({ error: 'Access denied' });
  next();
};


module.exports = { authMiddleware, sellerOnly };
