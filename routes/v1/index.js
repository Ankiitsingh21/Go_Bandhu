const express = require('express');
const router = express.Router();

const { signUp, signIn } = require('../../controller/user-controller.js');
const {
  validateUserAuth,
  validateUserAuthLogin,
  verifyToken,
  validateAgentAuth,
  verifyAgentToken,
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
  getQueryBYCityAndDocumentId,
} = require('../../controller/query-controller.js');
const { sendOtp, verifyOtp } = require('../../controller/otpController.js');
const { addNewAgent, agentSignIn } = require('../../controller/agent-controller.js');

router.post('/SignUp', validateUserAuth, signUp, createProfile);

router.post('/addNewAgent',validateAgentAuth,addNewAgent);

router.post('/agentLogin', validateUserAuthLogin, agentSignIn);

router.get('/getQueries', verifyAgentToken,getQueryBYCityAndDocumentId );

router.post('/Login', validateUserAuthLogin, signIn);

router.post('/updateProfile/userId/:userId', verifyToken, updateProfile);

router.get('/getProfile/userId/:userId', verifyToken, getProfile);

// router.post('/addNewDocument', addNewDocument);

router.get('/getAllDocument', getAllDocument);

router.post('/raiseproblem', verifyToken, raiseProblem);

router.get('/fetchQueryByUserId/userId/:userId', verifyToken, getQueryByUserId);

router.get('/fetchQueryByQueryId/queryId/:queryId', getQueryByQueryId);

router.get('/getStatusOfQuery/queryId/:queryId', getStatusOfQuery);

router.post('/changeStatus', changeSatus);

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

// send otp

// verify otp
module.exports = router;
