const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  author: {
    type: String,
    default: "user"
  },
  create_date: {
    type: Date,
    default: moment()
      .tz("Pacific/Apia")
      .format("YYYY-MM-DD HH:mm")
  }
});

module.exports = User = mongoose.model("users", UserSchema);
