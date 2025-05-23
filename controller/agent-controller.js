const AgentService = require('../services/agent-service');
const DocumentService = require('../services/document-service');
const Agent = require('../models/agents');
const Document = require('../models/document');

const documentService = new DocumentService();
const agentService = new AgentService();

const addNewAgent = async (req, res) => {
  try {
    // console.log(req.body);
    // const Document = await documentService.getById(req.body.documentId);
    const Documentt = await Document.find({ _id: req.body.documentId });
    // console.log(Documentt);
    const response = await agentService.createe({
      name: req.body.name,
      number: req.body.number,
      documentId: req.body.documentId,
      documentId2: req.body.documentId2,
      city: req.body.city,
      address: req.body.address,
      documentName: Documentt[0].name,
      fcmToken: req.body.fcmToken,
    });
    return res.status(200).json({
      success: 'True',
      message: 'Succesfully added a new Agent',
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error.error.error);
    // console.log("hii");
    const agent = await Agent.findOne(error.number);
    // console.log(user);
    const token = agent.genJWT();
    if (
      error.error.error ==
      'Agent already exists, but the number is not verified.'
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

const agentSignIn = async (req, res) => {
  try {
    const agent = await agentService.signIn({
      number: req.body.number,
      fcmToken: req.body.fcmToken,
    });
    return res.status(200).json({
      success: 'True',
      message: 'Succesfully Login',
      token: agent,
      err: {},
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: 'false',
      message: 'Not able to Login',
      data: {},
      err: error.message,
    });
  }
};

const getAgent = async (req, res) => {
  try {
    // console.log(req.agent.id);
    // const agent = await agentService.getById(req.agent.id);
    // const agent = await agentService.findByA(req.agent.id);
    const agentID = req.agent.id;
    const agent = await Agent.find({ _id: agentID });
    // console.log(agent[0]);
    return res.status(200).json({
      success: 'True',
      message: 'Succesfully fetched the agent',
      data: agent[0],
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: 'false',
      message: 'Not able to fetch Profile',
      data: {},
      err: error.message,
    });
  }
};

module.exports = {
  addNewAgent,
  agentSignIn,
  getAgent,
};
