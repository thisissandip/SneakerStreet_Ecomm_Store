const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 5000;

const DB_URL =
	"mongodb+srv://SandipSneakerStore:123SneakerStore123@cluster0.no5ds.mongodb.net/SneakerStore?retryWrites=true&w=majority";

mongoose
	.connect(DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((result) =>
		app.listen(port, () => console.log("Listening to Port 5000"))
	);

/* Middlewares */
// support parsing of application/json type post data
app.use(bodyparser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyparser.urlencoded({ extended: true }));

/* Routes */
app.use(authRoutes);
