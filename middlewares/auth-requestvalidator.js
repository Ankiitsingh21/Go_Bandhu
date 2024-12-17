const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Something went wrong',
      err: 'Email or password or name  is missing in the signup request',
    });
  }
  next();
};

const validateUserAuthLogin = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Something went wrong',
      err: 'Email or password  is missing in the signup request',
    });
  }
  next();
};

module.exports = {
  validateUserAuth,
  validateUserAuthLogin,
};
