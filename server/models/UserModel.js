const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	Cart: {
		type: Array,
	},
	CartTotal: {
		type: Number,
	},
	Orders: {
		type: Array,
	},
});

UserSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.statics.login = async function (email, password) {
	try {
		const user = await this.findOne({ email });
		if (user) {
			const auth = await bcrypt.compare(password, user.password);
			if (auth) {
				return user;
			}
		}
	} catch (err) {
		console.log(err);
	}
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
