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
}

module.exports = {
  QueryRepository,
};
