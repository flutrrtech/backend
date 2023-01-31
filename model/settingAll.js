const mongoose = require("mongoose");
const customerSettingSchema = new mongoose.Schema(
   {
    cr_id:String,
    c_unique_id:String,
    c_display_info:Boolean,
    c_hide_location:Boolean,
    c_sexual_orientation:Boolean,
    c_want_to_see:String,
    c_push_notification:Boolean,
    c_email_notification:Boolean,
    c_dark_mode:Boolean,
    c_language:Boolean,
    c_freeze_account:Boolean,
    c_help_text:String
    
   }
);

module.exports = mongoose.model("CustomerSetting", customerSettingSchema);