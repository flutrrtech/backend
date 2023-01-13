const mongoose = require("mongoose");
const customerReportSchema = new mongoose.Schema(
   {
    cr_id:String,
    cr_send_user_unique_id: String,
    cr_for_user_unique_id: String,
    cr_report_heading: String,
    cr_report_matter: String,
    cr_msg_from_admin: String,
    cr_status:{
        type:String,
        enum:['1','2','3'],
        default:'1'
    }  // '1=> submitted , 2=> accept from admin, 3=> denied from admin'
   }
);

module.exports = mongoose.model("CustomerReport", customerReportSchema);