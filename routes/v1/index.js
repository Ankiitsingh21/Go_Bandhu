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
  getProfile,
} = require('../../controller/profile-controller.js');
const {
  addNewDocument,
  getAllDocument,
} = require('../../controller/document-controller.js');
const {
  raiseProblem,
  getQueryByUserId,
  getQueryByQueryId,
  changeSatus,
  getStatusOfQuery,
} = require('../../controller/query-controller.js');

router.post('/SignUp', validateUserAuth, signUp, createProfile);

// field --> mobileVerified : boolean == > default false

// route to mAKE IT TRUE 

router.post('/Login', validateUserAuthLogin, signIn);

router.post('/updateProfile', verifyToken, updateProfile);

<<<<<<< HEAD
router.get('/getProfile', verifyToken, getProfile);
=======
// get profile 

>>>>>>> 78e048b2daf948b4ca72e54f06bd0aa94c53b308

// router.post('/addNewDocument', addNewDocument);

router.get('/getAllDocument', getAllDocument);

router.post('/raiseproblem', verifyToken, raiseProblem);

router.get('/fetchQueryByUserId', verifyToken, getQueryByUserId);

router.get('/fetchQueryByQueryId', getQueryByQueryId);

router.get('/getStatusOfQuery', getStatusOfQuery);

router.post('/changeStatus', changeSatus);

// send otp

// verify otp 
module.exports = router;
