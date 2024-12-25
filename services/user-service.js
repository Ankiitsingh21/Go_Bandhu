const { UserRepository } = require('../repository/user-repository');

class UserService {
  constructor() {
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
      // console.log("In the user service layer "+data.number);
      const number = data.number;
      // console.log("In the user service layer "+data.password);
      const user = await this.userRepository.findByNumber({ number });
      if (!user) {
        throw new Error('No user found');
      }
      // if (user.roles == 'Admin') {
      //   console.log('This user is Admin');
      // }
      // if (!user.comparePassword(data.password)) {
      //   throw new Error('Incorrect password');
      // }
      const token = user.genJWT();
      // console.log(token);
      return token;
    } catch (error) {
      console.log('Something went wrong in the Service Layer');
      throw error;
    }
  }

  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log('Something went wrong in the service layer');
      throw { error };
    }
  }
}

module.exports = UserService;
