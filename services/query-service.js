const ProfileRepository = require('../repository/profile-repository');
const DocumentRepository = require('../repository/document-repository');
const { QueryRepository } = require('../repository/query-repository');
const CrudService = require('./crud-service');

class QueryService extends CrudService {
  constructor() {
    const queryRepository = new QueryRepository();
    super(queryRepository);
    this.documentRepository = new DocumentRepository();
    this.profileRepository = new ProfileRepository();
    this.queryRepository = new QueryRepository();
  }

  async raiseProblem(data) {
    try {
      const { userId, text, assistanceType, documentId } = data;
      const profile = await this.profileRepository.findByUserId(userId);
      if (!profile) {
        console.error(`Profile not found for userId: ${userId}`);
        throw new Error('Profile not found');
      }
      const document = await this.documentRepository.findById(documentId);
      if (!document) {
        console.error(`Document not found for documentId: ${documentId}`);
        throw new Error('Document not found');
      }
      const { number, name: userName, address, city } = profile;
      const { name: documentName } = document;
      if (!userName || !address || !city) {
        console.error(
          `Missing required profile fields: userName, address, or city`
        );
        throw new Error('Profile is missing required fields');
      }
      const response = await this.queryRepository.create({
        userId,
        number,
        userName,
        address,
        city,
        text,
        assistanceType,
        documentId,
        documentName,
      });

      return response;
    } catch (error) {
      console.log(error);
      console.error('Error creating query:', error.message);
      throw error;
    }
  }

  async getQueryByUserId(userId) {
    try {
      return await this.queryRepository.findByUserId(userId);
    } catch (error) {
      console.log('Something went wrong in Query Service', error);
      throw error;
    }
  }
}

module.exports = QueryService;
