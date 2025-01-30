const express = require('express');
const router = express.Router();

const {
  signUp,
  signIn,
  getAll,
} = require('../../controller/user-controller.js');
const {
  validateUserAuth,
  validateUserAuthLogin,
  verifyToken,
  validateAgentAuth,
  verifyAdminToken,
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
const {
  addNewAgent,
  agentSignIn,
} = require('../../controller/agent-controller.js');
const {
  accept,
  reject,
} = require('../../controller/problemSolving-controller.js');
const {
  getAllAgents,
  adminSignIn,
  adminSignUp,
  activateOrDeactivateAgent,
} = require('../../controller/admin-controller.js');

//agents
router.post('/addNewAgent', validateAgentAuth, addNewAgent);

router.post('/agentLogin', validateUserAuthLogin, agentSignIn);

router.post('/changeStatus', verifyAgentToken, changeSatus);

router.get(
  '/getQueries/city/:cityName/documentId/:documentId',
  verifyToken,
  getQueryBYCityAndDocumentId
);

router.get('/getAlluser', verifyAdminToken, getAll);

router.post('/accept', verifyAgentToken, accept);

router.post('/reject', verifyAgentToken, reject);

router.post('/SignUp', validateUserAuth, signUp, createProfile);

router.post('/Login', validateUserAuthLogin, signIn);

router.post('/updateProfile', verifyToken, updateProfile);

router.get('/getProfile', verifyToken, getProfile);

router.post(
  '/activateorDeactivateAgent',
  verifyAdminToken,
  activateOrDeactivateAgent
);

//admin

// router.post('/adminSignUp',adminSignUp);

router.post('/adminLogin', adminSignIn);

router.get('/getAllAgent', verifyAdminToken, getAllAgents);

// router.post('/addNewDocument', addNewDocument);

//users

router.get('/getAllDocument', getAllDocument);

router.post('/raiseproblem', verifyToken, raiseProblem);

router.get('/fetchQueryByUserId', verifyToken, getQueryByUserId);

router.get('/fetchQueryByQueryId/queryId/:queryId', getQueryByQueryId);

router.get('/getStatusOfQuery/queryId/:queryId', getStatusOfQuery);

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

// send otp

// verify otp
module.exports = router;
