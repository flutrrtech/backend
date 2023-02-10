const mongoose = require("mongoose");
const customerMicroTransactionSchema = new mongoose.Schema(
   {
    cmm_id: String,
    cmm_c_unique_id:String,
    cmm_boost: String,
    cmm_boost_end:String ,
    cmm_boost_for_trn_id:String ,
    cmm_free_super_like:String,
    cmm_free_super_like_end: String,
    cmm_super_like:{
        type:String,
    } ,
    cmm_super_like_end:String,
    cmm_super_like_for_trn_id:String ,
    cmm_free_like: String,
    cmm_free_like_end:String,
    cmm_like:String ,
    cmm_like_end:String ,
    cmm_like_for_trn_id:String ,
    cmm_free_rewind:String,
    cmm_free_rewind_end:String,
    cmm_rewind:String ,
    cmm_rewind_end:String ,
    cmm_rewind_for_trn_id:String ,
    cmm_audio_remaining_time:String ,
    cmm_audio_for_trn_id:String ,
    cmm_video_remaining_time:String ,
    cmm_video_for_trn_id :String,
    cmm_cmm_audio_for_trn_id_for_trn_id:String 
   }
);

module.exports = mongoose.model("CustomerMT", customerMicroTransactionSchema);