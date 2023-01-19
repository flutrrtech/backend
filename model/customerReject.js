const mongoose = require("mongoose");
const customerRejectSchema = new mongoose.Schema(
  {
    crm_id: String,
    crm_sender_unique_id: String,
    crm_receiver_unique_id: String,
    crm_reject_time:{
      type:Number,
      default:1
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CustomerReject", customerRejectSchema);
