const { UserRepository } = require('../repositories/user-repository');
const CrudService = require('./crud-service');

class UserService extends CrudService {
  constructor() {
    const userRepository = new UserRepository();
    super(userRepository);
    this.userRepository = new UserRepository();
  }

  async signUp(data) {
    try {
      const user = await this.userRepository.create(data);
      // console.log(user);
      return user;
    } catch (error) {
      console.log('Something went wrong in the Service Layer');
      console.log(error);
      throw error;
    }
  }

  async getUserByNumber(number) {
    try {
      // console.log(email)
      const user = await this.userRepository.findByNumber({ number });
      return user;
    } catch (error) {
      console.log('Something went wrong on the service Layer', error);
      throw error; // Rethrow error to handle it at a higher level
    }
  }

  async signIn(data) {
    try {
      const number = data.number;
      const user = await this.userRepository.findByNumber({ number });

      if (!user) {
        throw new Error('No user found');
      }

      // if (!user.comparePassword(data.password)) {
      //   throw new Error('Incorrect password');
      // }

      const token = user.genJWT();

      // Structure the response data
      const response = {
        id: user.id,
        number: user.number,
        name: user.name,
        token: token,
      };

      return response;
    } catch (error) {
      console.log('Something went wrong in the Service Layer');
      throw error;
    }
  }

  // isAdmin(userId) {
  //   try {
  //     return this.userRepository.isAdmin(userId);
  //   } catch (error) {
  //     console.log('Something went wrong in the service layer');
  //     throw { error };
  //   }
  // }
}

module.exports = UserService;
