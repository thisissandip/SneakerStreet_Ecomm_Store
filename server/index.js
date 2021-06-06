const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/productroutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotEnv = require('dotenv');

dotEnv.config();

const app = express();
const port = process.env.PORT || 5000;

/* const mydomain = 'http://localhost:3000'; */

/* DB CONNECTION */
const DB_URL = process.env.DB_URL;

app.set('trust proxy', 1);

mongoose
	.connect(DB_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then((result) =>
		app.listen(port, () => {
			console.log(`Connection established ${port}`);
		})
	);

app.set('trust proxy', 1);

// support parsing of application/json type post data
app.use(bodyparser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyparser.urlencoded({ extended: true }));
// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.HOST,
		credentials: true,
	})
);

/* ROUTES */
app.use(productRouter);
app.use(userRoutes);
app.use(authRoutes);
app.use(paymentRoutes);
