const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const stripe = require('stripe')(
	'sk_test_51IaZabSA3ZYbv4sWqfHFy3B0OfRFOlIq3MyKOqwJ8h8rRLsifPycBKJF5eHuv18FAJlHDOTTBFziZrfUwMtjkQPG00cSnMOBDn'
);

router.post('/create-payment-intent', async (req, res) => {
	let { useremail, inputs } = req.body;
	const user = await User.findOne({ email: useremail });

	if (user) {
		let total = user.CartTotal;
		try {
			// Create a PaymentIntent with the order amount and currency
			const paymentIntent = await stripe.paymentIntents.create({
				amount: total * 100,
				currency: 'INR',
				payment_method_types: ['card'],
				description: 'Sneaker Street Ltd',
				shipping: {
					name: `${inputs.name}`,
					address: {
						line1: `${inputs.address}`,
						postal_code: `${inputs.pcode}`,
						city: `${inputs.city}`,
						state: `${inputs.state}`,
						country: `${inputs.country}`,
					},
				},
			});

			res.status(201).send({
				clientSecret: paymentIntent.client_secret,
			});
		} catch (err) {
			console.log(err);
			res.json({
				message: 'Payment Failed',
				success: false,
			});
		}
	}
});

module.exports = router;
