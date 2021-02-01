const express = require("express");
const SneakersData = require("../SneakerDB");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("HOME PAGE");
});

router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductByID);

module.exports = router;
