const axios = require('axios');
const User = require('../models/UserModel');

module.exports.updateCart = async (req, res) => {
	const uemail = req.body.uemail;
	const productid = req.body.productid;

	try {
		let oldcart = [];
		const userexist = await User.findOne({ email: uemail });
		if (userexist) {
			oldcart = userexist.Cart;
		}

		let newcart = [...oldcart, productid];
		const updateddata = await User.findOneAndUpdate(
			{ email: uemail },
			{ Cart: newcart },
			{ new: true }
		);
	} catch (err) {
		console.log(err);
	}
};

module.exports.GetUserDetails = async (req, res) => {
	const userid = req.params.id;
	try {
		const userexist = await User.findOne({ _id: userid });
		if (userexist) {
			res.json({
				fname: userexist.fname,
				lname: userexist.lname,
				email: userexist.email,
				cart: userexist.Cart,
			});
		}
	} catch (err) {
		res.send('User Does not Exist');
	}
};
