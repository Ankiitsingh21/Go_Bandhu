const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
    },
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: 'admin',
    },
  },
  { timestamps: true }
);

adminSchema.methods.genJWT = function generate() {
  return jwt.sign(
    { id: this._id, number: this.number, role: this.role },
    JWT_KEY,
    {
      expiresIn: '25d',
    }
  );
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
