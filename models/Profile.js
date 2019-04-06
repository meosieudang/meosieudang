const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true
  },
  create_date: {
    type: String,
    required: true
  },
  profile: [
    {
      type: Schema.Types.ObjectId,
      ref: "plates"
    }
  ],
  dateAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
