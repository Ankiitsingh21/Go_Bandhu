const ProfileRepository = require('../repositories/profile-repository');
const DocumentRepository = require('../repositories/document-repository');
const { QueryRepository } = require('../repositories/query-repository');
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
      // console.log(data);
      // const userId = req.user.id;
      // console.log(req.user);
      // console.log(userId);
      const {  userId ,text, assistanceType, documentId, address } = data;
      // console.log(userId);
      const profiles = await this.profileRepository.findByUserId(userId);
      // console.log(profiles);
      if (!profiles || profiles.length === 0) {
        console.error(`Profile not found for userId: ${userId}`);
        throw new Error('Profile not found');
      }
      // console.log(documentId);
      const document =
        await this.documentRepository.findByDocumentId(documentId);
      // console.log(document);
      if (!document) {
        console.error(`Document not found for documentId: ${documentId}`);
        throw new Error('Document not found');
      }
      // const profile = profiles[0];
      const { number, name: userName, city } = profiles;
      const { name: documentName } = document;
      if (!userName || !city) {
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

  async getStatusByQueryId(id) {
    try {
      // console.log(id);
      const response = await this.queryRepository.getStatusOfQuery(id);
      return response;
    } catch (error) {
      console.log('something went wrong on Crud service layer');
      throw { error };
    }
  }

  async getQueryByCityAndDocumentId(city, documentId) {
    try {
      // console.log(city,documentId);
      const response = await this.queryRepository.getQueryByCityAndDocumentId(
        city,
        documentId
      );
      return response;
    } catch (error) {
      console.error('Error in getQueryByCityAndDocumentId service:', error);
      throw error;
    }
  }
}

module.exports = QueryService;
