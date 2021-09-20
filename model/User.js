const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(

	{
		username: {
			type: String,
			required: [true, "Username is required"]
		},
		email: {
			type: String,
			required: [true, "Email is required"]
		},
		mobileNo: {
			type: String,
			required: [true, "Mobile Number is required"]
		},
		password: {
			type: String,
			required: [true, "Password is required"]
		},
		isAdmin: {
			type: Boolean,
			default: false
		}
	}
);

module.exports = mongoose.model("User", userSchema)