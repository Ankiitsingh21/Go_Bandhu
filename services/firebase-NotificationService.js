// services/firebase-notification-service.js
const admin = require('firebase-admin');
const Agent = require('../models/agents');

class FirebaseNotificationService {
  constructor() {
    // Initialize Firebase Admin SDK if not already initialized
    if (!admin.apps.length) {
      // You need to get this service account key from Firebase console
      const serviceAccount = require('../config/serviceAccountKey.json');
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }
  }

  /**
   * Send notification to multiple FCM tokens
   * @param {Array} tokens - Array of FCM tokens
   * @param {Object} notification - Notification payload
   * @param {Object} data - Data payload
   * @returns {Promise} Firebase messaging response
   */
  async sendToMultipleDevices(tokens, notification, data = {}) {
    if (!tokens || tokens.length === 0) {
      console.log('No tokens provided for notification');
      return { successCount: 0, failureCount: 0 };
    }
  
    const validTokens = tokens.filter(token => token && token.trim() !== '');
  
    // console.log(`Valid tokens: ${validTokens.length}`, validTokens);
    if (validTokens.length === 0) {
      console.log('No valid tokens after filtering');
      return { successCount: 0, failureCount: 0 };
    }
  
    try {
      const response = await admin.messaging().sendEachForMulticast({
        tokens: validTokens,
        notification,
        data,
      });
  
      console.log(`Successfully sent message: ${response.successCount} successful, ${response.failureCount} failed`);
      return response;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }
  
  // /**
  //  * Get all FCM tokens for agents in a specific city and with a specific documentId
  //  * @param {String} city - City name
  //  * @param {String} documentId - Document ID
  //  * @returns {Promise<Array>} Array of FCM tokens
  //  */
  async getAgentTokensByCityAndDocumentId(city) {
    try {
      const agents = await Agent.find({ 
        city, 
        // documentId,
        fcmToken: { $exists: true, $ne: '' } 
      });
      // console.log(agents);
      return agents.map(agent => agent.fcmToken);
    } catch (error) {
      console.error('Error fetching agent tokens:', error);
      throw error;
    }
  }

  /**
   * Notify all agents in a city about a new problem
   * @param {String} city - City name
   * @param {String} documentId - Document ID
   * @param {Object} problemData - Problem details
   * @returns {Promise} Notification result
   */
  async notifyAgentsAboutNewProblem(city, problemData) {
    try {
      const tokens = await this.getAgentTokensByCityAndDocumentId(city);
      // console.log(tokens);
      if (tokens.length === 0) {
        console.log(`No agents found in ${city}`);
        return { success: false, message: 'No agents to notify' };
      }

      const notification = {
        title: 'New Problem Request',
        body: `A new problem has been raised in ${city}`
      };

      const data = {
        type: 'NEW_PROBLEM',
        problemId: problemData._id.toString(),
        city: city,
        // documentId: documentId,
        timestamp: Date.now().toString(),
        assistanceType: problemData.assistanceType || '',
        // Add other non-sensitive fields as needed
      };

      const result = await this.sendToMultipleDevices(tokens, notification, data);
      return {
        success: true,
        notifiedCount: result.successCount,
        failedCount: result.failureCount
      };
    } catch (error) {
      console.error('Error notifying agents:', error);
      throw error;
    }
  }
}

module.exports = FirebaseNotificationService;