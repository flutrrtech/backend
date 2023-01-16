const mongoose = require("mongoose");
const customerMatchSchema = new mongoose.Schema(
  {
    cmm_id: String,
    cmm_sender_unique_id: String,
    cmm_receiver_unique_id: String,
    cmm_match_time:{
      type:Date,
      default:new Date()
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CustomerMatch", customerMatchSchema);