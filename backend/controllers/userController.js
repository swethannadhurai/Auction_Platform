const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
	const { username, email, password, confirmPassword } = req.body;

	try {
		if (!username || !email || !password || !confirmPassword) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			id: user._id,
			username: user.username,
			email: user.email,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "User doesn't exist" });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: "Invalid password" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

	
		res.cookie("jwt", token, {
			httpOnly: true,
			secure: true, 
			sameSite: "None", 
			maxAge: 24 * 60 * 60 * 1000, 
		});

		
		res.status(200).json({
			id: user._id,
			username: user.username,
			email: user.email,
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};




const getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json({
			id: user._id,
			username: user.username,
			email: user.email,
		});
	} catch (error) {
		console.error("Profile fetch error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};


const logoutUser = async (req, res) => {
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
	registerUser,
	loginUser,
	getProfile,
	logoutUser,
};