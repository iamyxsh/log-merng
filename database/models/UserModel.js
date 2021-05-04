const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		password: String,
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

const User = mongoose.model("User", userSchema)

module.exports = User
