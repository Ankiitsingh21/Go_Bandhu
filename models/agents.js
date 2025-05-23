const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    documentId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Document',
      required: true,
    },
    documentId2: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Document',
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length <= 3;
        },
        message: 'documentId2 can have at most 3 items.',
      },
    },
    city: {
      type: String,
      required: true,
    },
    documentName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'pending'],
      default: 'pending',
    },
    address: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: ' ',
    },
    role: {
      type: String,
      default: 'agent',
    },
    numberVerified: {
      type: Boolean,
      default: false,
    },
    fcmToken: {
      type: String,
      default: null,
    },
    // deviceInfo: {
    //   type: Object,
    //   default: null,
    // },
    callsAccepted: {
      type: Number,
      default: 0,
    },
    callsResolved: {
      type: Number,
      default: 0,
    },
    callsPending: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

agentSchema.methods.genJWT = function generate() {
  return jwt.sign(
    { id: this._id, number: this.number, role: this.role },
    JWT_KEY,
    {
      expiresIn: '25d',
    }
  );
};

// agentSchema.post('init', function(doc) {
//   doc.collection.createIndex({ number: 1 }, { unique: true });
// });

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
