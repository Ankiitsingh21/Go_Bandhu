const ProfileService = require('../services/profile-service');
const { UserRepository } = require('../repository/user-repository');

const userRepository = new UserRepository();

const profileService = new ProfileService();

const createProfile = async (req, res) => {
  try {
    const profile = await profileService.createProfileFromUser(req.userId);
    return res.status(201).json({
      success: true,
      message: 'User and Profile created successfully',
      data: profile,
      err: {},
    });
  } catch (error) {
    console.error('Error in ProfileController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to create profile',
      data: {},
      err: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    // const { userId } = req.params;
    const updateData = req.body;
    // console.log(req.user.id);
    const userId = req.user.id;
    // console.log(userId)
    const updatedProfile = await profileService.updateProfile(
      userId,
      updateData
    );

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile,
      err: {},
    });
  } catch (error) {
    console.error('Error in ProfileController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to update profile',
      data: {},
      err: error.message,
    });
  }
};

module.exports = {
  createProfile,
  updateProfile,
  getProfile,
};
