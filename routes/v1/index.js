const express = require('express');
const router = express.Router();

const { signUp, signIn } = require('../../controller/user-controller.js');
const {
  validateUserAuth,
  validateUserAuthLogin,
  verifyToken,
} = require('../../middlewares/auth-requestvalidator.js');
const {
  createProfile,
  updateProfile,
} = require('../../controller/profile-controller.js');

router.post('/SignUp', validateUserAuth, signUp, createProfile);

router.post('/updateProfile', verifyToken, updateProfile);

router.post('/Login', validateUserAuthLogin, signIn);

module.exports = router;
