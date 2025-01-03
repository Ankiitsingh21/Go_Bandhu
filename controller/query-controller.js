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
    const userId = req.params.userId;
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
    const queryId = req.params.queryId;
    // console.log(queryId);
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
    const queryId = req.params.queryId;
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
    const queryId = req.query.queryId;
    const { status } = req.body;

    if (!queryId || !status) {
      return res.status(400).json({
        success: false,
        message: 'queryId and status are required',
        data: {},
        err: {},
      });
    }

    const response = await queryService.update(queryId, { status });

    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'Query not found',
        data: {},
        err: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully changed status by queryId',
      data: response,
      err: {},
    });
  } catch (error) {
    console.error('Error in QueryController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to change status of Query',
      data: {},
      err: error,
    });
  }
};


const getQueryBYCityAndDocumentId = async (req,res)=>{
  try{
    // console.log("hellow", req.params);
    const city = req.params.cityName; 
    const documentId = req.params.documentId; 
    // console.log(city,documentId);
    const response = await queryService.getQueryByCityAndDocumentId(city,documentId);
    return res.status(201).json({
      success: true,
      message: 'successfully fetched query by city and documentId',
      data: response,
      err: {},
    });
  }catch (error) {
    console.error('Error in QueryController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch  Query by city and documentId',
      data: {},
      err: error,
    });
  }
}

module.exports = {
  raiseProblem,
  getQueryByUserId,
  getQueryByQueryId,
  changeSatus,
  getStatusOfQuery,
  getQueryBYCityAndDocumentId
};
