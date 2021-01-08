const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/productroutes");
const authRoutes = require("./routes/authROutes");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const mydomain = "http://localhost:3000";

/* DB CONNECTION */
const DB_URL =
	"mongodb+srv://SandipSneakerStore:123SneakerStore123@cluster0.no5ds.mongodb.net/SneakerStore?retryWrites=true&w=majority";

mongoose
	.connect(DB_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then((result) =>
		app.listen(port, () => {
			console.log("Connection established and listening to Port");
		})
	);

/* MIDDLEWARES */
// enabling CORS without npm package
/* app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
}); */

// support parsing of application/json type post data
app.use(bodyparser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyparser.urlencoded({ extended: true }));
// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());
app.use(
	cors({
		origin: mydomain,
		credentials: true,
	})
);

/* ROUTES */
app.use(productRouter);
app.use(authRoutes);
