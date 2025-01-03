const AgentService = require('../services/agent-service');
const DocumentService = require('../services/document-service');

const documentService = new DocumentService();
const agentService = new AgentService();

const addNewAgent = async (req, res) => {
  try {
    const Document = await documentService.getById(req.body.documentId);
    const response = await agentService.create({
      name: req.body.name,
      number: req.body.number,
      documentId: req.body.documentId,
      city: req.body.city,
      address: req.body.address,
      documentName: Document[0].name,
    });
    return res.status(200).json({
      success: 'True',
      message: 'Succesfully added a new Agent',
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: 'false',
      message: 'Not able to add a new Agent',
      data: {},
      err: error,
    });
  }
};

const agentSignIn = async (req, res) => {
  try {
    const agent = await agentService.signIn({
      number: req.body.number,
    });
    return res.status(200).json({
      success: 'True',
      message: 'Succesfully Login',
      data: agent,
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
  addNewAgent,
  agentSignIn,
};
