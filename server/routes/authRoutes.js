const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.loginPost);
router.post("/signup", authController.signupPost);

module.exports = router;
