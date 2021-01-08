const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const handleErrors = (err) => {
	let errors = {
		email: "",
	};
	// error code for already Registered Email
	if (err.code === 11000) {
		errors.email = "Email is already Registered";
	} else {
		console.log(err);
	}
	return errors;
};

module.exports.signupPost = async (req, res) => {
	const userdata = req.body;
	try {
		const newuser = await User.create(userdata);
		//console.log(newuser);
		res.json({
			userid: newuser._id,
		});
	} catch (err) {
		let errors = handleErrors(err);
		res.json({ errors });
	}
};
/* 
module.exports.loginPost = async (req, res) => {
	const logindata = req.body;
	try {
		const userdata = await User.find({ email: logindata.loginemail });
		if (
			userdata.length > 0 &&
			userdata[0].password === logindata.loginpassword
		) {
			res.json({ userid: userdata[0]._id });
		} else {
			res.json({
				errors: "Username or Password is Invalid",
			});
		}
	} catch (err) {
		console.log(err);
	}
}; */

module.exports.loginPost = async (req, res) => {
	const logindata = req.body;
	let email = logindata.loginemail;
	let password = logindata.loginpassword;

	try {
		const user = await User.login(email, password);
		if (user) {
			res.json({
				userid: user._id,
			});
		} else {
			res.json({
				errors: "Username or Password is Invalid",
			});
		}
	} catch (err) {
		console.log(err);
	}
};
