const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/updatecart', userController.updateCart);
router.get('/user/:id', userController.GetUserDetails);
router.post('/newcarttotal', userController.NewCartTotal);
router.post('/emptycart', userController.EmptyCart);
router.post('/updatemyorders', userController.updateMyOrders);
router.post('/newsletter', userController.NewsLetter);
router.post('/updatecartonlogin', userController.UpdateCartLogin);

module.exports = router;
