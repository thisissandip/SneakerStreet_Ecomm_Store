const axios = require('axios');
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');
const nodemailer = require('nodemailer');

module.exports.updateCart = async (req, res) => {
	const uemail = req.body.uemail;
	const productid = req.body.productid;
	const type = req.body.type;

	try {
		let oldcart = [];
		const userexist = await User.findOne({ email: uemail });
		if (userexist) {
			oldcart = userexist.Cart;
		}

		/* 	Model.findOneAndUpdate(conditions, update, options, (error, doc) => {
			// error: any errors that occurred
			// doc: the document before updates are applied if `new: false`, or after updates if `new = true`
		  }); */

		if (type === 'ADD') {
			let newcart = [...oldcart, productid];

			const updateddata = await User.findOneAndUpdate(
				{ email: uemail },
				{ Cart: newcart },
				{ new: true }
			);
		} else if (type === 'REMOVE') {
			let newcart = oldcart.filter((item) => item !== productid);

			const updateddata = await User.findOneAndUpdate(
				{ email: uemail },
				{ Cart: newcart },
				{ new: true }
			);
		}
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
				orders: userexist.Orders,
				cTotal: userexist.CartTotal,
			});
		}
	} catch (err) {
		res.send('User Does not Exist');
	}
};

module.exports.NewCartTotal = async (req, res) => {
	let { value, user } = req.body;

	const updateddata = await User.findOneAndUpdate(
		{ email: user },
		{ CartTotal: Math.round(value) },
		{ new: true }
	);
	if (updateddata) {
		res.status(201).json({
			carttotal: updateddata.CartTotal,
		});
	}
};

module.exports.EmptyCart = async (req, res) => {
	let uemail = req.body.uemail;
	const updateddata = await User.findOneAndUpdate(
		{ email: uemail },
		{ Cart: [], CartTotal: 0 },
		{ new: true }
	);
	if (updateddata) {
		if (updateddata.Cart.length === 0) {
			res.status(201).json({
				cartzero: true,
			});
		}
	}
};

module.exports.updateMyOrders = async (req, res) => {
	let uemail = req.body.uemail;
	let ucart = req.body.ucart;
	try {
		let oldorders = [];
		let neworders = [];

		const userexist = await User.findOne({ email: uemail });
		if (userexist) {
			if (userexist.Orders.length !== 0) {
				oldorders = userexist.Orders;
				neworders = [...oldorders, ...ucart];
			} else {
				neworders = [...ucart];
			}

			const updateddata = await User.findOneAndUpdate(
				{ email: uemail },
				{ Orders: neworders },
				{ new: true }
			);

			if (updateddata) {
				res.json({
					updateorders: true,
				});
			}
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports.NewsLetter = async (req, res) => {
	try {
		let email = req.body.email;
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'sneakerstreet789@gmail.com',
				pass: 'sandip@25',
			},
		});

		var mailOptions = {
			from: 'sneakerstreet789@gmail.com',
			to: `${email}`,
			subject: 'Welcome To Sneaker Street NewsLetter',
			text: 'Thank You for Subscribing To Us!',
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				res.status(201).json({
					msg: 'Success',
				});
				console.log('Email sent: ' + info.response);
			}
		});
	} catch (err) {
		res.status(401).json({
			msg: 'Error Occured',
		});
		console.log(err);
	}
};
