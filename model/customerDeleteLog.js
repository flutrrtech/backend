const mongoose = require("mongoose");
const customerDeleteLogSchema = new mongoose.Schema(
   {
     cdl_id: String,
     cdl_unique_id:String,
    c_reason :String,
     cdl_other_details: String,
    
    
   },{timestamps:true}
);

module.exports = mongoose.model("CustomerDeleteLog", customerDeleteLogSchema);