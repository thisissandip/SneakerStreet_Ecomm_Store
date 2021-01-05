const Product = require("../models/ProductModel");

module.exports.getAllProducts = (req, res) => {
	try {
		Product.find({}, (err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.json(data);
			}
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports.getProductByID = async (req, res) => {
	let productID = req.params.id;
	try {
		const TheProduct = await Product.findById(productID);
		res.json(TheProduct);
	} catch (err) {
		console.log(err);
	}
};
