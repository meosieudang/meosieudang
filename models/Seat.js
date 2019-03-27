const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const SeatSchema = new Schema({
  plates: {
    type: Schema.Types.ObjectId,
    ref: "plates"
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profiles"
  },
  nameSeat: {
    type: String,
    required: true
  },
  nameUser: {
    type: String,
    default: null
  },
  phoneUser: {
    type: String,
    default: null
  },
  isBook: {
    type: Boolean,
    default: false
  }
});

module.exports = Seat = mongoose.model("seats", SeatSchema);
