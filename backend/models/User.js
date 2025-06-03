const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: new Date(new Date().getTime()),
	},
	role: {
    type: String,
    enum: ['user', 'seller'],
    default: 'user'
  }
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);