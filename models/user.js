const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');

const rolesEnum = ['ADMIN', 'USER', 'SUPERADMIN', 'VARIABLE'];

const userSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return v.toString().length === 10;
        },
        message: (props) => `${props.value} is not a valid 10-digit number!`,
      },
    },
    roles: {
      type: String,
      enum: rolesEnum,
      default: 'USER',
    },
    numberVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true }
);

// userSchema.post('init', function(doc) {
//   doc.collection.createIndex({ number: 1 }, { unique: true });
// });

// userSchema.methods.comparePassword = function compare(password) {
//   return bcrypt.compareSync(password, this.password);
// };

userSchema.methods.genJWT = function generate() {
  return jwt.sign({ id: this._id }, JWT_KEY, {
    expiresIn: '25d',
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
