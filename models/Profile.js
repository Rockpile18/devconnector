const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  address_line1: {
    type: String
  },
  address_line2: {
    type: String
  },
  county: {
    type: String
  },
  relationship_status: {
    type: String
  },
  homeowner: {
    type: Boolean
  },
  beneficiary: [
    {
      name: {
        type: String,
        required: true
      },
      address_line1: {
        type: String
      },
      address_line2: {
        type: String
      }
    }
  ],
  trustee: [
    {
      name: {
        type: String,
        required: true
      },
      address_line1: {
        type: String
      },
      address_line2: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
