const AdminService = require('../services/admin-service');
const AgentService = require('../services/agent-service');

const agentService = new AgentService();
const adminService = new AdminService();

const getAllAgents = async (req, res) => {
  try {
    const response = await agentService.getAllAgents();
    return res.status(200).json({
      success: true,
      message: 'successfully fetched all agents',
      data: response,
      err: {},
    });
  } catch (error) {
    console.error('Error in AdminController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch all agents',
      data: {},
      err: error,
    });
  }
};

const adminSignIn = async (req, res) => {
  try {
    const admin = await adminService.signIn({
      number: req.body.number,
    });
    return res.status(200).json({
      success: 'True',
      message: 'Succesfully Login',
      data: admin,
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

const adminSignUp = async (req, res) => {
  try {
    const admin = await adminService.create({
      name: req.body.name,
      number: req.body.number,
    });
    return res.status(200).json({
      success: 'True',
      message: 'Succesfully SignUp',
      data: admin,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: 'false',
      message: 'Not able to SignUp',
      data: {},
      err: error.message,
    });
  }
};

module.exports = {
  getAllAgents,
  adminSignIn,
  adminSignUp,
};
