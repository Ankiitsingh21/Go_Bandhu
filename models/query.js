const mongoose = require('mongoose');

const Status = ['Submitted', 'InProgress', 'Call', 'Resolved'];

const AssistanceType = ['Physical', 'Virtual'];

const querySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    documentId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Document',
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    documentName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      maxlength: 200,
      default: null,
    },
    status: {
      type: String,
      enum: Status,
      default: 'Submitted',
    },
    assistanceType: {
      type: String,
      enum: AssistanceType,
      required: true,
    },
  },
  { timestamps: true }
);

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
