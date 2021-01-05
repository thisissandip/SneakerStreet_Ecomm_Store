const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	Name: String,
	BuyUsed: String,
	BuyNew: String,
	SKU: String,
	Images: [
		{
			type: String,
		},
	],
	Details: {
		Brand: String,
		des: String,
		releasedate: String,
		SKU: String,
		Color: String,
		Category: String,
		Designer: String,
		UpperMaterial: String,
	},
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
