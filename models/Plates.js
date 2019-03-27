const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const PlatesSchema = new Schema({
  licensePlates: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  seat: [
    {
      nameSeat: {
        type: String,
        required: true
      },
      nameUser: {
        type: String,
        default: ""
      },
      phoneUser: {
        type: String,
        default: ""
      },
      isBook: {
        type: Boolean,
        default: false
      }
    }
  ],
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profiles"
  }
});

module.exports = Plates = mongoose.model("plates", PlatesSchema);
