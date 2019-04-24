const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
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
ProfileSchema.plugin(mongoosePaginate);
module.exports = Profile = mongoose.model("profiles", ProfileSchema);
