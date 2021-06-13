const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { create } = require('../models/UserModel');
const queryString = require('query-string');
const axios = require('axios');

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
		res.cookie('jwt', token, {
			httpOnly: true,
			maxAge: maxAge * 1000,
			sameSite: 'none',
			secure: true,
		});
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
		if (user !== undefined && user !== null) {
			const userid = user._id;
			const token = createToken(userid);
			res.cookie('jwt', token, {
				httpOnly: true,
				maxAge: maxAge * 1000,
				sameSite: 'none',
				secure: true,
			});
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
	res.cookie('jwt', '', {
		httpOnly: true,
		maxAge: -1000,
		sameSite: 'none',
		secure: true,
	});
	res.status(201).json({
		logout: true,
	});
};

// Oauth for Facebook

module.exports.loginFacebook = async (req, res) => {
	const stringifiedParams = queryString.stringify({
		client_id: process.env.FACEBOOK_CLIENT_ID,
		redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
		scope: ['email', 'public_profile'].join(','), // comma seperated string
		response_type: 'code',
		auth_type: 'rerequest',
		display: 'popup',
	});

	const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

	return res.redirect(`${facebookLoginUrl}`);
};

module.exports.getAccessTokenFacebook = async (req, res) => {
	let urlString = req.originalUrl;
	let paramString = urlString.split('?')[1];
	let code = paramString.split('=')[1];

	const { data } = await axios({
		url: 'https://graph.facebook.com/v4.0/oauth/access_token',
		method: 'get',
		params: {
			client_id: process.env.FACEBOOK_CLIENT_ID,
			client_secret: process.env.FACEBOOK_CLIENT_SECRET,
			redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
			code,
		},
	});
	//console.log(data); // { access_token, token_type, expires_in }
	const userdata = await getFacebookUserData(data.access_token);
	const DBuserid = await LoginInFacebookUser(userdata);

	if (DBuserid !== null && DBuserid !== undefined) {
		const token = createToken(DBuserid);

		res.cookie('jwt', token, {
			httpOnly: true,
			maxAge: maxAge * 1000,
			sameSite: 'none',
			secure: true,
		});

		res.redirect(process.env.HOST);
	}
};

const getFacebookUserData = async (access_token) => {
	const { data } = await axios({
		url: 'https://graph.facebook.com/me',
		method: 'get',
		params: {
			fields: ['id', 'email', 'first_name', 'last_name'].join(','),
			access_token,
		},
	});
	//console.log(data); // { id, email, first_name, last_name }
	return data;
};

const LoginInFacebookUser = async (userdata) => {
	const userexists = await User.findOne({ email: userdata.email });

	if (userexists) {
		return userexists._id;
	}

	const newFBUser = new User();

	newFBUser.fname = userdata.first_name;
	newFBUser.lname = userdata.last_name;
	newFBUser.email = userdata.email;
	newFBUser.password = 'Facebookuser@123';
	newFBUser.save();

	return newFBUser._id;
};
