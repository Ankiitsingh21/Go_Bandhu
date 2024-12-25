const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SALT: bcrypt.genSaltSync(10),
  JWT_KEY: process.env.JWT_KEY,
  FAST2SMSAPI_key: process.env.FAST2SMS_APIKEY,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  MONGODB_URI: process.env.MONGODB_URI,
};
