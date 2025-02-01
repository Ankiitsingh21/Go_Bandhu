const mongoose = require('mongoose');

const Status = ['Submitted', 'InProgress', 'Resolved'];

const AssistanceType = ['Physical - Rs.499 onwards', 'Virtual - Rs.9'];

// const numberOfHOurs = ['2 Hours - Rs.499','4 Hours - Rs.999','6 Hours - Rs.1499'];

// const timing = ['10:00 Am','11:00 Am','12:00 Pm','01:00 Pm','02:00 Pm','03:00 Pm','04:00 Pm','05:00 Pm','06:00 Pm','07:00 Pm'];

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
    address: {
      type: String,
      default: null,
    },
    noOfHours: {
      type: String,
      default: null,
    },
    timing: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
