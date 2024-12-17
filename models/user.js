const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT, JWT_KEY } = require('../config/serverConfig');

const rolesEnum = ['Admin', 'User', 'SuperAdmin', 'variable'];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    enum: rolesEnum,
    default: 'User',
  },
});

userSchema.pre('save', function (next) {
  const user = this;
  const encryptedpassword = bcrypt.hashSync(user.password, SALT);
  user.password = encryptedpassword;
  next();
});

userSchema.methods.comparePassword = function compare(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.genJWT = function generate() {
  return jwt.sign({ id: this._id, email: this.email ,role:this.roles}, JWT_KEY, {
    expiresIn: '2d',
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
