const User = require('../models/user.js');
const { CrudRepository } = require('./crud-repository.js');

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async createe(data) {
    try {
      const result = await User.create(data);
      // console.log(result);
      return result;
    } catch (error) {
      console.log('Something went wrong in the repository layer');

      if (error.code === 11000) {
        const key = Object.keys(error.keyPattern)[0];
        const value = error.keyValue[key];
        // console.log('Key:', key + ' Value:', value);
        const existingUser = await User.findOne({ [key]: value });
        // console.log(existingUser);
        if (existingUser && key === 'number' && !existingUser.numberVerified) {
          // const token = existingUser.genJWT();
          throw {
            error: 'User already exists, but the number is not verified.',
            existingUser,
            // token,
          };
        } else {
          throw {
            error: `Duplicate key error: ${key} already exists.`,
            existingUser,
          };
        }
      } else {
        throw { error };
      }
    }
  }
  // async isAdmin(userId) {
  //   try {
  //     const user = await User.findByPk(userId);
  //     const adminRole = await Role.findOne({
  //       where: {
  //         name: 'ADMIN',
  //       },
  //     });
  //     return user.hasRole(adminRole);
  //   } catch (error) {
  //     console.log('Something went wrong on the repository layer');
  //     throw { error };
  //   }
  // }
}
module.exports = {
  UserRepository,
};
