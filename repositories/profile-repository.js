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
      const result = await Profile.find({ userId });
      // return await Profile.find({ userId });
      // const user = result[0];
      // console.log('Result:', user);
      return result[0];
    } catch (error) {
      console.log('Something went wrong in ProfileRepository', error);
      throw error;
    }
  }
}

module.exports = ProfileRepository;
