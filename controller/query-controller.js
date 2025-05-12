const { text } = require('body-parser');
const QueryService = require('../services/query-service');
const Agent = require('../models/agents');
const profile = require('../models/profile');
const FirebaseNotificationService = require('../services/firebase-NotificationService');

const queryService = new QueryService();
const firebaseNotificationService = new FirebaseNotificationService();

const raiseProblem = async (req, res) => {
  try {
    // Create the problem using your existing service
    const response = await queryService.raiseProblem({
      userId: req.user.id,
      documentId: req.body.documentId,
      text: req.body.text,
      assistanceType: req.body.assistanceType,
      address: req.body.address,
      noOfHours: req.body.noOfhours,
      timing: req.body.timing,
    });

    // console.log(req.user.id);
    const userId= req.user.id;
    const Profile = await profile.find({userId});
    // console.log(Profile[0].city);
    // Get city information - either from the address in the request or from user data
    const city = Profile[0].city;

    // Send notifications to agents in the same city with the same documentId
    const notificationResult = await firebaseNotificationService.notifyAgentsAboutNewProblem(
      city,
      // req.body.documentId,
      response
    );

    console.log('Notification result:', notificationResult);

    return res.status(201).json({
      success: true,
      message: 'Query raised successfully',
      data: response,
      notificationSent: notificationResult.success,
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
      message: 'Unable to fetch Query by userid',
      data: {},
      err: error,
    });
  }
};

const getStatusOfQuery = async (req, res) => {
  try {
    const queryId = req.params.queryId;
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
      message: 'Unable to fetch Status by Queryid',
      data: {},
      err: error,
    });
  }
};

const getQueryByQueryId = async (req, res) => {
  try {
    const queryId = req.params.queryId;
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
      message: 'Unable to fetch Query by Queryid',
      data: {},
      err: error,
    });
  }
};

const changeSatus = async (req, res) => {
  try {
    const queryId = req.body.queryId;
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
    // console.log(response);

    if(status === 'Resolved'){
      const agentId = req.agent.id;
      await Agent.findByIdAndUpdate(
        agentId,
        {
          $inc: {
            callsResolved: 1,
            callsPending: -1,
          },
        },
        { new: true }
      );
    }
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

const getQueryBYCityAndDocumentId = async (req, res) => {
  try {
    const agent = await Agent.findById(req.agent.id);
    // console.log(agent.documentId2);
    const response = await queryService.getQueryByCityAndDocumentId(
      agent.city,
      agent.documentId,
      agent.documentId2
    );
    
    if (response.length === 0) {
      return res.status(201).json({
        success: true,
        message: 'No Query found',
        data: {},
        err: {},
      });
    }
    return res.status(201).json({
      success: true,
      message: 'successfully fetched query by city and documentId',
      data: response,
      err: {},
    });
  } catch (error) {
    console.error('Error in QueryController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch Query by city and documentId',
      data: {},
      err: error,
    });
  }
};

// New method to send test notification
const sendTestNotification = async (req, res) => {
  try {
    const { city } = req.body;
    
    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City and documentId are required',
        data: {},
        err: {},
      });
    }

    // Dummy problem data for testing
    const testProblem = {
      _id: 'test-problem-id',
      assistanceType: 'Test Assistance',
      text: 'This is a test notification'
    };

    const result = await firebaseNotificationService.notifyAgentsAboutNewProblem(
      city,
      // documentId,
      testProblem
    );

    return res.status(200).json({
      success: true,
      message: 'Test notification sent',
      data: result,
      err: {},
    });
  } catch (error) {
    console.error('Error sending test notification:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to send test notification',
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
  getQueryBYCityAndDocumentId,
  sendTestNotification, 
};