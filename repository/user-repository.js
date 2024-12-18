const User = require('../models/user.js');
const { CrudRepository } = require('./crud-repository.js');

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getLatestUser() {
    try {
      const latestUser = await this.model.findOne().sort({ _id: -1 });
      return latestUser ? latestUser._id : null;
    } catch (error) {
      console.error('Error fetching the latest user:', error);
      throw error;
    }
  }
}
module.exports = {
  UserRepository,
};
