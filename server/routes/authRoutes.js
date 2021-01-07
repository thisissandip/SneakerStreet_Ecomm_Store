const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", (req, res) => {
	res.send("Login Page");
});

router.post("/login", (req, res) => {
	res.json({
		typeofrequest: "Login Post",
	});
});

router.get("/signup", (req, res) => {
	res.send("signup Page");
});

router.post("/signup", authController.signupPost);

module.exports = router;
