const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.loginPost);
router.post('/signup', authController.signupPost);
router.get('/checkuser', authController.checkUser);
router.get('/logoutuser', authController.logoutUser);
router.get('/login/facebook', authController.loginFacebook);
router.get('/oauth/facebook', authController.getAccessTokenFacebook);

module.exports = router;
