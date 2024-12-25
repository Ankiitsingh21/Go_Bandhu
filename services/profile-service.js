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
      // console.log('Fetched user:', users);

      if (!users || users.length === 0) {
        throw new Error('User not found');
      }

      // Access the first user in the array
      const user = users[0];
      // console.log(user);
      const profileData = [
        {
          userId: user._id,
          number: user.number,
        },
      ];
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
      return await this.profileRepository.update(profile._id, updateData);
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
