const DocumentService = require('../services/document-service');

const documentService = new DocumentService();

const addNewDocument = async (req, res) => {
  try {
    const response = await documentService.create({
      name: req.body.name,
      neccessaryDetailsToAsk: req.body.details,
    });
    return res.status(200).json({
      success: 'True',
      message: 'Succesfully added a new Document',
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: 'false',
      message: 'Not able to add a new Document',
      data: {},
      err: error,
    });
  }
};

module.exports = {
  addNewDocument,
};
