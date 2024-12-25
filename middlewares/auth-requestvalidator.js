const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');

const validateUserAuth = (req, res, next) => {
  if (!req.body.number) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Something went wrong',
      err: 'number  is missing in the signup request',
    });
  }
  next();
};

const validateUserAuthLogin = (req, res, next) => {
  if (!req.body.number) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Something went wrong',
      err: 'Number  is missing in the signup request',
    });
  }
  next();
};

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      success: false,
      data: {},
      message: 'Access token is missing',
      err: 'No token provided',
    });
  }
  try {
    const response = jwt.verify(token, JWT_KEY);
    // console.log(response);
    req.user = response;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Invalid token',
        err: error.message,
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        data: {},
        message: 'Token has expired',
        err: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      data: {},
      message: 'Something went wrong while verifying the token',
      err: error.message,
    });
  }
};

const validateIsAdminRequest = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      succes: false,
      data: {},
      err: 'UserId not given',
      message: 'something went wrong',
    });
  }
  next();
};

module.exports = {
  validateUserAuth,
  validateUserAuthLogin,
  verifyToken,
  validateIsAdminRequest,
};
