const ProfileRepository = require('../repositories/profile-repository');
const { UserRepository } = require('../repositories/user-repository');

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
      const profile = await this.profileRepository.create(profileData);
      // console.log('Profile:', profile);
      const token = user.genJWT();
      profile.token = token;
      // console.log('Profile:', profile);
      return profile;
    } catch (error) {
      // console.log('hellow');
      console.log('Something went wrong in ProfileService', error);
      throw error;
    }
  }

  async updateProfile(userId, updateData) {
    try {
      // console.log(userId);
      const profiles = await this.profileRepository.findByUserId(userId);
      if (!profiles || profiles.length === 0) {
        throw new Error('Profile not found');
      }

      // const profile = profiles[0]; // Now profile is defined before logging
      // console.log('Profile:', profile);
      // console.log('Update data:', updateData);
      // console.log('Profile:', profile);
      return await this.profileRepository.update(profiles.id, updateData);
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
