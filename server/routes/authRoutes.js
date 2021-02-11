const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.loginPost);
router.post('/signup', authController.signupPost);
router.get('/checkuser', authController.checkUser);
router.get('/logoutuser', authController.logoutUser);
router.get('/user/:id', authController.GetUserDetails);
module.exports = router;
