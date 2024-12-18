const UserService = require('../services/user-service.js');

const userService = new UserService();

const signUp = async (req, res, next) => {
  try {
    const user = await userService.signUp({
      email: req.body.email,
      password: req.body.password,
      number: req.body.number,
    });
    req.userId = user._id;
    next();
    // return res.status(200).json({
    //   success: 'True',
    //   message: 'Succesfully created a new user',
    //   data: user,
    //   err: {},
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: 'false',
      message: 'Not able to create a new user',
      data: {},
      err: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    // console.log("In the controller layer "+req.body.email);
    // console.log("In the controller layer "+req.body.password);
    const user = await userService.signIn({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(200).json({
      success: 'True',
      message: 'Succesfully Login',
      data: user,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: 'false',
      message: 'Not able to Login',
      data: {},
      err: error.message,
    });
  }
};

module.exports = {
  signUp,
  signIn,
};
