const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const Agent = require('../models/agents');
const User = require('../models/user');

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

const validateAgentAuth = (req, res, next) => {
  if (
    !req.body.number ||
    !req.body.name ||
    // !req.body.documentId ||
    !req.body.city ||
    !req.body.address
  ) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Something went wrong',
      err: 'number or name or documentId or city or adddress  is missing in the signup request',
    });
  }
  next();
};

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  // console.log(token);
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
    const user = await User.findById(response.id);
    // console.log(user);
    if (user.numberVerified === false) {
      return res.status(401).json({
        success: false,
        data: {},
        message: 'Number is not verified',
        err: 'Unauthorized access',
      });
    }

    if(user.status !== 'ACTIVE'){
      return res.status(403).json({
        success: false,
        data: {},
        message: 'User is not active!! Contact to Admin',
        err: 'Inactive user',
      });
    }
    req.user = response;
    // console.log(req.user);
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

const verifyAdminToken = (req, res, next) => {
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
    // req.user = response;
    if (response.role !== 'admin') {
      return res.status(401).json({
        success: false,
        data: {},
        message: 'You are not authorized to access this route',
        err: 'Unauthorized access',
      });
    }
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

const verifyAgentToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  // console.log(token);
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
    // req.user = response;
    if (response.role !== 'agent') {
      return res.status(401).json({
        success: false,
        data: {},
        message: 'You are not authorized to access this route',
        err: 'Unauthorized access',
      });
    }

    const agent = await Agent.findById(response.id);
    // console.log(agent);
    // if(!agent.numberVerified){
    //   return res.status(501).json({
    //     success:false,
    //     data:{},
    //     message:'Number is not verified',
    //     err: 'Number is not verified',
    //   })
    // }
    if(!agent){
      return res.status(404).json({
        success: false,
        data: {},
        message: 'No Agent Found',
        err: 'No Agent Found',
      })
    }
    if (agent.status !== 'Active') {
      return res.status(403).json({
        success: false,
        data: {},
        message: 'Agent is not active',
        err: 'Inactive agent',
      });
    }
    req.agent = response;
    // console.log(req.agent);

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

// const numberIsVerified = async (req, res, next) => {
//   const token = req.headers['x-access-token'];
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       data: {},
//       message: 'Access token is missing',
//       err: 'No token provided',
//     });
//   }
//   try {
//     const response = jwt.verify(token, JWT_KEY);
//     console.log(response);
//     // req.user = response;

//     // next();
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(400).json({
//         success: false,
//         data: {},
//         message: 'Invalid token',
//         err: error.message,
//       });
//     }

//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({
//         success: false,
//         data: {},
//         message: 'Token has expired',
//         err: error.message,
//       });
//     }
//     return res.status(500).json({
//       success: false,
//       data: {},
//       message: 'Something went wrong while verifying the token',
//       err: error.message,
//     });
//   }
// };

module.exports = {
  validateUserAuth,
  validateUserAuthLogin,
  verifyToken,
  verifyAdminToken,
  validateAgentAuth,
  verifyAgentToken,
};
