const User = require('../models/user.js');
const { CrudRepository } = require('./crud-repository.js');

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: 'ADMIN',
        },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log('Something went wrong on the repository layer');
      throw { error };
    }
  }
}
module.exports = {
  UserRepository,
};
