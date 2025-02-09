const UserService = require('../services/user-service.js');
const User = require('../models/user');

const userService = new UserService();

const signUp = async (req, res, next) => {
  try {
    const user = await userService.signUp({
      number: req.body.number,
    });
    req.userId = user._id;
    next();
    // return res.status(200).json({
    //   success: 'True',
    //   message: 'Succesfully created a new user',
    //   data: user,
    //   err: {},.
    // });
  } catch (error) {
    // console.log(error.error.error);
    const user = await User.findOne(error.number);
    // console.log(user);
    const token = user.genJWT();
    if (
      error.error.error ==
      'User already exists, but the number is not verified.'
    ) {
      return res.status(200).json({
        success: 'true',
        message: 'User already exists, but the number is not verified',
        token: token,
        err: {},
      });
    }
    return res.status(500).json({
      success: 'false',
      message: 'Not able to create a new user',
      data: { token },
      err: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    // console.log("In the controller layer "+req.body.number);
    // console.log("In the controller layer "+req.body.password);
    const user = await userService.signIn({
      number: req.body.number,
    });
    return res.status(200).json({
      success: 'True',
      message: 'Succesfully Login',
      data: user,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(502).json({
      success: 'false',
      message: 'Not able to Login',
      data: {},
      err: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    // console.log("ho");
    const response = await userService.getAll();
    return res.status(201).json({
      data: response,
      success: true,
      err: {},
      message: 'Successfully fetched all users',
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'Not able to fetch all users',
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.userId);
    return res.status(201).json({
      data: response,
      success: true,
      err: {},
      message: 'Successfully fetched user is admin ',
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: 'user is not a admin',
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = {
  signUp,
  signIn,
  getAll,
};
