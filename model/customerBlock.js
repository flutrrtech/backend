const mongoose = require("mongoose");
const customerBlockSchema = new mongoose.Schema(
   {
    block_sender_phone:String,
    block_receiver_phone:String
    
   }
);

module.exports = mongoose.model("CustomerBlock", customerBlockSchema);