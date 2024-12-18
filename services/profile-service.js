const ProfileRepository = require('../repository/profile-repository');
const { UserRepository } = require('../repository/user-repository');

class ProfileService {
  constructor() {
    this.profileRepository = new ProfileRepository();
    this.userRepository = new UserRepository();
  }

  async createProfileFromUser(userId) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const profileData = {
        userId: user._id,
        email: user.email,
        number: user.number,
        password: user.password,
      };

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
