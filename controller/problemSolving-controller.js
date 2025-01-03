const ProblemSolvingService = require('../services/problemSolving-service');
const QueryService = require('../services/query-service');

const queryService = new QueryService();

const problemSolvingService = new ProblemSolvingService();

const accept = async (req, res) => {
  try {
    statusc = 'accepted';
    const response = await problemSolvingService.create({
      QueryId: req.body.QueryId,
      AgentId: req.body.AgentId,
      status: statusc,
    });
    const status = 'InProgress';
    await queryService.update(req.body.QueryId, { status });
    // console.log(resp);
    return res.status(201).json({
      success: true,
      message: 'ProblemSolving accepted successfully',
      data: response,
      err: {},
    });
  } catch (error) {
    console.error('Error in ProblemSolvingController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to accept ProblemSolving',
      data: {},
      err: error,
    });
  }
};

const reject = async (req, res) => {
  try {
    const { QueryId, AgentId } = req.body;
    const existingQuery = await problemSolvingService.getAll({
      QueryId,
      AgentId,
    });
    if (existingQuery && existingQuery.status === 'accepted') {
      await problemSolvingService.delete(existingQuery._id);
      return res.status(200).json({
        success: true,
        message:
          'ProblemSolving was accepted earlier and has now been rejected and deleted successfully',
        data: {},
        err: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: 'ProblemSolving rejected successfully',
      data: {},
      err: {},
    });
  } catch (error) {
    console.error('Error in ProblemSolvingController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to reject ProblemSolving',
      data: {},
      err: error,
    });
  }
};

module.exports = {
  accept,
  reject,
};
