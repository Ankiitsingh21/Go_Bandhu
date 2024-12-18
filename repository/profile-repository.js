const { CrudRepository } = require('./crud-repository');
const Profile = require('../models/profile');
const mongoose = require('mongoose');

class ProfileRepository extends CrudRepository {
  constructor() {
    super(Profile);
  }
  async findByUserId(userId) {
    try {
      // const response = await Profile.findOne({userId});
      // console.log("hiii heloo   "+response);
      return await Profile.findOne({ userId });
    } catch (error) {
      console.log('Something went wrong in ProfileRepository', error);
      throw error;
    }
  }
}

module.exports = ProfileRepository;
