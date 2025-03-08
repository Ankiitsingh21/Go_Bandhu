const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    referedBy: {
      type: String,
      default: null,
    },
    referalCode: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
