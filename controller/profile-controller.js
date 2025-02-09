const ProfileService = require('../services/profile-service');

const profileService = new ProfileService();

const createProfile = async (req, res) => {
  try {
    const profile = await profileService.createProfileFromUser(req.userId);
    console.log('Profile:', profile);
    // const token = profile.token;
    return res.status(201).json({
      success: 'true',
      message: 'User and Profile created successfully',
      token: profile,
      err: {},
    });
  } catch (error) {
    // console.error('Error in ProfileController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to create profile',
      data: {},
      err: error,
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
    // console.log(updateData);
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

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(userId);
    const profile = await profileService.getProfileByUserId(userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
        data: {},
        err: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: profile,
      err: {},
    });
  } catch (error) {
    console.error('Error in ProfileController:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve profile',
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
