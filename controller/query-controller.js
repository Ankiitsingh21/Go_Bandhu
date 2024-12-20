const QueryService = require('../services/query-service');

const queryService = new QueryService();

const raiseProblem = async (req, res) => {
  try {
    const response = await queryService.raiseProblem(req.body);
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

module.exports = {
  raiseProblem,
};
