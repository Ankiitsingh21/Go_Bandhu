const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    neccessaryDetailsToAsk: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
