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
      unique:true
    },
    documentId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Document',
      required: true,
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

agentSchema.post('init', function(doc) {
  doc.collection.createIndex({ number: 1 }, { unique: true });
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
