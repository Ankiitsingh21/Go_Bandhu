const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const { SALT, JWT_KEY } = require('../config/serverConfig');


const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    documentId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Document",
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
      enum: ["accept", "reject", "pending"],
      default: "pending",
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);


agentSchema.methods.genJWT = function generate() {
        return jwt.sign(
          { id: this._id, number:this.number },
          JWT_KEY,
          {
            expiresIn: '25d',
          }
        );
      };

const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;