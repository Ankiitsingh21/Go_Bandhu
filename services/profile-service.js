const ProfileRepository = require('../repository/profile-repository');
const { UserRepository } = require('../repository/user-repository');

class ProfileService {
  constructor() {
    this.profileRepository = new ProfileRepository();
    this.userRepository = new UserRepository();
  }

  async createProfileFromUser(userId) {
    try {
      // console.log(userId);
      const users = await this.userRepository.findById(userId); // returns an array
      console.log('Fetched user:', users);

      if (!users || users.length === 0) {
        throw new Error('User not found');
      }

      // Access the first user in the array
      const user = users[0];
      console.log(user);
      const profileData = [
        {
          userId: user._id,
          email: user.email,
          number: user.number,
          password: user.password,
        },
      ];
      console.log('Profile data to be created:', profileData);
      return await this.profileRepository.create(profileData);
    } catch (error) {
      console.log('Something went wrong in ProfileService', error);
      throw error;
    }
  }

  async updateProfile(userId, updateData) {
    try {
      const profile = await this.profileRepository.findByUserId(userId);
      if (!profile) {
        throw new Error('Profile not found');
      }
      if (!updateData.email) {
        return await this.profileRepository.update(profile._id, updateData);
      } else {
        const email = updateData.email;
        const user = await this.userRepository.update(userId, email);
        return await this.profileRepository.update(profile._id, updateData);
      }
    } catch (error) {
      console.log('Something went wrong in ProfileService', error);
      throw error;
    }
  }

  async getProfileByUserId(userId) {
    try {
      return await this.profileRepository.findByUserId(userId);
    } catch (error) {
      console.log('Something went wrong in ProfileService', error);
      throw error;
    }
  }
}

module.exports = ProfileService;
