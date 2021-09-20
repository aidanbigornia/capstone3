const mongoose = require("mongoose");

let productSchema = new mongoose.Schema(

	{
		image: {
			type: String
		},
		name: {
			type: String,
			required: [true, "Product Name is required"]
		},
		description: {
			type: String,
			required: [true, "Product Description is required"]
		},
		price: {
			type: String,
			required: [true, "Product Price is required"]
		},
		isActive: {
			type: Boolean,
			default: true
		},
		createdOn: {
			type: Date,
			default: new Date()
		}
	}
)

module.exports = mongoose.model("Product", productSchema);