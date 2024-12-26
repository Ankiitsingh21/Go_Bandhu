const { text } = require('body-parser');
const QueryService = require('../services/query-service');

const queryService = new QueryService();

const raiseProblem = async (req, res) => {
  try {
    // console.log(req.user);
    // console.log(req.body);
    const response = await queryService.raiseProblem({
      userId: req.user.id,
      documentId: req.body.documentId,
      text: req.body.text,
      assistanceType: req.body.assistanceType,
      address: req.body.address,
    });
    return res.status(201).json({
      success: true,
      message: 'Query raised successfully',
      data: response,
      err: {},
    });
  } catch (error) {
    console.error('Error in QueryController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to raise Query',
      data: {},
      err: error,
    });
  }
};

const getQueryByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await queryService.getQueryByUserId(userId);
    return res.status(201).json({
      success: true,
      message: 'successfully fetched query by userid',
      data: response,
      err: {},
    });
  } catch (error) {
    console.error('Error in QueryController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch  Query by userid',
      data: {},
      err: error,
    });
  }
};

const getStatusOfQuery = async (req, res) => {
  try {
    const queryId = req.body.queryId;
    const response = await queryService.getStatusByQueryId(queryId);
    return res.status(201).json({
      success: true,
      message: 'successfully fetched Status by queryid',
      data: response,
      err: {},
    });
  } catch (error) {
    console.error('Error in QueryController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch  Status by Queryid',
      data: {},
      err: error,
    });
  }
};

const getQueryByQueryId = async (req, res) => {
  try {
    const queryId = req.body.queryId;
    // console.log(queryId);
    const response = await queryService.getById(queryId);
    return res.status(201).json({
      success: true,
      message: 'successfully fetched query by queryid',
      data: response,
      err: {},
    });
  } catch (error) {
    console.error('Error in QueryController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch  Query by Queryid',
      data: {},
      err: error,
    });
  }
};

const changeSatus = async (req, res) => {
  try {
    const queryId = req.body.queryId;
    const updateData = req.body.change;
    // console.log(updateData);
    const response = await queryService.update(queryId, updateData);
    return res.status(201).json({
      success: true,
      message: 'successfully changed status by Queryid',
      data: response,
      err: {},
    });
  } catch (error) {
    console.error('Error in QueryController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to change   status of Query',
      data: {},
      err: error,
    });
  }
};

module.exports = {
  raiseProblem,
  getQueryByUserId,
  getQueryByQueryId,
  changeSatus,
  getStatusOfQuery,
};
