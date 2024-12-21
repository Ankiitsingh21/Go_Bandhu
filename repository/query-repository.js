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
}

module.exports = {
  QueryRepository,
};
