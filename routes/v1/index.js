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
const { addNewDocument } = require('../../controller/document-controller.js');
const {
  raiseProblem,
  getQueryByUserId,
  getQueryByQueryId,
  changeSatus,
} = require('../../controller/query-controller.js');

router.post('/SignUp', validateUserAuth, signUp, createProfile);

router.post('/updateProfile', verifyToken, updateProfile);

router.post('/Login', validateUserAuthLogin, signIn);

router.post('/addNewDocument', addNewDocument);

router.get('/fetchQueryByUserId', getQueryByUserId);

router.get('/fetchQueryByQueryId', getQueryByQueryId);

router.post('/changeStatus', changeSatus);

router.post('/raiseproblem', raiseProblem);

module.exports = router;
