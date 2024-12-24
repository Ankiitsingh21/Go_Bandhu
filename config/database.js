const mongoose = require('mongoose');
const { MONGODB_URI } = require('./serverConfig');

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = { connect };
