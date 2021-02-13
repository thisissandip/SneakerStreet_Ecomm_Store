const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { create } = require('../models/UserModel');

const handleErrors = (err) => {
	let errors = {
		email: '',
	};
	// error code for already Registered Email
	if (err.code === 11000) {
		errors.email = 'Email is already Registered';
	} else {
		console.log(err);
	}
	return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, 'sneakerstoreserver', {
		expiresIn: maxAge,
	});
};

module.exports.signupPost = async (req, res) => {
	const userdata = req.body;
	try {
		const newuser = await User.create(userdata);
		const userid = newuser._id;
		//console.log(newuser);
		const token = createToken(userid);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(201).json({
			userid,
		});
	} catch (err) {
		let errors = handleErrors(err);
		res.json({ errors });
	}
};

module.exports.loginPost = async (req, res) => {
	const logindata = req.body;
	let email = logindata.loginemail;
	let password = logindata.loginpassword;
	try {
		const user = await User.login(email, password);
		if (user) {
			const userid = user._id;
			const token = createToken(userid);
			res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
			res.status(201).json({
				userid,
			});
		} else {
			res.json({
				errors: 'Username or Password is Invalid',
			});
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports.checkUser = async (req, res) => {
	const token = req.cookies['jwt'];
	try {
		const decoded = jwt.verify(token, 'sneakerstoreserver');
		const userid = decoded.id;

		res.status(201).json({
			userid,
		});
	} catch (err) {
		res.send('You are not logged in');
	}
};

module.exports.logoutUser = async (req, res) => {
	res.clearCookie('jwt');
	res.status(201).send('logout successful');
};
