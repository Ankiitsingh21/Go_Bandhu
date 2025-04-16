const Query = require('../models/query');
const { CrudRepository } = require('./crud-repository');

class QueryRepository extends CrudRepository {
  constructor() {
    super(Query);
  }

  async findByUserId(userId) {
    try {
      // const response = await Profile.findOne({userId});
      // console.log("hiii heloo   "+response);
      return await Query.find({ userId });
    } catch (error) {
      console.log('Something went wrong in Query Repository', error);
      throw error;
    }
  }

  async getStatusOfQuery(id) {
    try {
      // console.log(id);
      const result = await this.model.find({ _id: id });
      const res = result[0];
      // console.log(res.status);
      return res.status;
    } catch (error) {
      console.log('Something went wrong in the repository layer');
      console.log(error);
      throw { error };
    }
  }

  async getQueryByCityAndDocumentId(city, documentId,documentId2) {
    try {
      // console.log(city,documentId);
      // console.log(documentId2);
      const query = { status: 'Submitted' };
      // const query= {};
      if (city) query.city = new RegExp(`^${city}$`, 'i');
      const documentId2Array = Array.isArray(documentId2) ? documentId2 : [documentId2];

    query.$or = [
      { documentId: { $in: documentId } },
      { documentId2: { $in: documentId2Array } }
    ];
      console.log("passing query = ",query);
      const result = await Query.find(query);
      // console.log("result = ",result);
      return result;
    } catch (error) {
      console.error('Error in getQueryByCityAndDocumentId repository:', error);
      throw error;
    }
  }
}

module.exports = {
  QueryRepository,
};
