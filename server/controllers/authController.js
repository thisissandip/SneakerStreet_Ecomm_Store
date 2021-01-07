const User = require("../models/UserModel");

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
