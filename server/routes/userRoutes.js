const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/updatecart', userController.updateCart);
router.get('/user/:id', userController.GetUserDetails);

module.exports = router;
