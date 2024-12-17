const express = require('express');
const router= express.Router();

const { signUp, signIn } = require('../../controller/user-controller.js');
const { validateUserAuth, validateUserAuthLogin } = require('../../middlewares/auth-requestvalidator.js');


router.post('/SignUp',validateUserAuth,signUp);

router.post('/Login',validateUserAuthLogin,signIn);

module.exports = router;
 