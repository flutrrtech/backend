const mongoose = require("mongoose");
const customerMicroTransactionSchema = new mongoose.Schema({
  cmm_id: String,
  cmm_c_unique_id: String,
  cmm_boost: {
    type:String,
    default:""
  },
  cmm_boost_end: {
    type:String,
    default:""
  },
  cmm_boost_for_trn_id: {
    type:String,
    default:""
  },
  cmm_free_super_like: {
    type:String,
    default:""
  },
  cmm_free_super_like_end: {
    type:String,
    default:""
  },
  cmm_super_like: {
    type: String,
    default:""
  },
  cmm_super_like_end: {
    type:String,
    default:""
  },
  cmm_super_like_for_trn_id: {
    type:String,
    default:""
  },
  cmm_free_like: {
    type:String,
    default:""
  },
  cmm_free_like_end: {
    type:String,
    default:""
  },
  cmm_like: {
    type:String,
    default:""
  },
  cmm_like_end: {
    type:String,
    default:""
  },
  cmm_like_for_trn_id: {
    type:String,
    default:""
  },
  cmm_free_rewind: {
    type:String,
    default:""
  },
  cmm_free_rewind_end: {
    type:String,
    default:""
  },
  cmm_rewind: {
    type:String,
    default:""
  },
  cmm_rewind_end: {
    type:String,
    default:""
  },
  cmm_rewind_for_trn_id: {
    type:String,
    default:""
  },
  cmm_audio_remaining_time: {
    type:String,
    default:""
  },
  cmm_audio_for_trn_id: {
    type:String,
    default:""
  },
  cmm_video_remaining_time: {
    type:String,
    default:""
  },
  cmm_video_for_trn_id: {
    type:String,
    default:""
  },
  cmm_cmm_audio_for_trn_id_for_trn_id: {
    type:String,
    default:""
  },
  cmm_unlock_like: {
    type:String,
    default:""
  },
  cmm_unlock_like_for_trn_id: {
    type:String,
    default:""
  },
  cmm_unlock_toppick: {
    type:String,
    default:""
  },
  cmm_unlock_toppick_for_trn_id: {
    type:String,
    default:""
  },
  cmm_free_unlock_like: {
    type:String,
    default:""
  },
  cmm_free_unlock_like_end: {
    type:String,
    default:""
  },
  cmm_free_unlock_toppick: {
    type:String,
    default:""
  },
  cmm_free_unlock_toppick_end: {
    type:String,
    default:""
  },
});

module.exports = mongoose.model("CustomerMT", customerMicroTransactionSchema);
