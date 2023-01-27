const mongoose = require("mongoose");
const customerTopPickSchema = new mongoose.Schema(
   {
    cr_id:String,
    cr_unique_id:String,
    c_gender:String
    // '1=> submitted , 2=> accept from admin, 3=> denied from admin'
   }
);

module.exports = mongoose.model("CustomerTopPick", customerTopPickSchema);