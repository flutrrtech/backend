const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  c_response_type: String,
  c_phone: String,
  c_email: String,
  c_f_name: String,
  c_l_name: String,
  c_initial_name: String,
  c_dob: String,
  c_unique_id:String,
  c_gender: String,
  c_gender_preference: String,
  c_here_for: String,
  c_passion_1: {
    type:String,
    default:""
  },
  c_passion_2: {
    type:String,
    default:""
  },
  c_lang: {
    type:String,
    default:""
  },
  c_bio: {
    type:String,
    default:""
  },
  c_selfie_pic: {
    type:String,
    default:""
  },
  c_gender_display: {
  type:String,
  default:""
  },
  c_display_name: {
    type:String,
    default:""
    },
  c_firebase_token: {
    type:String,
    default:""
    },
  c_device_info: {
    type:String,
    default:""
    },
  c_facebook_token: {
    type:String,
    default:""
    },
  c_apple_token:{
    type:String,
    default:""
    },
  coordinates:{
    type:Array,
    default:[],
    index:true
  },
  c_profile_image_1: {
    type: String,
    default: "",
  },
  c_profile_image_2: {
    type: String,
    default: "",
  },
  c_profile_image_3: {
    type: String,
    default: "",
  },
  c_profile_image_4: {
    type: String,
    default: "",
  },
  c_profile_image_5: {
    type: String,
    default: "",
  },
  c_lat: {
    type: String,
    default: "",
  },
  c_long: {
    type: String,
    default: "",
  },
  c_google_token: {
    type: String,
    default: "",
  },
  c_educational_qualification: {
    type: String,
    default: "",
  },
  c_institution: {
    type: String,
    default: "",
  },
  c_profession: {
    type: String,
    default: "",
  },
  c_phone_verify: {
    type: String,
    default: "",
  },
  c_email_verify: {
    type: String,
    default: "",
  },
  c_selfie_verify: {
    type: String,
    default: "",
  },
  c_selfie_report: {
    type: String,
    default: "",
  },
  c_is_top_picked: {
    type: String,
    default: "",
  },
  c_freeze_basic_info: {
    type: String,
    default: "",
  },
  c_is_ghost_mode: {
    type: String,
    default: "",
  },
  c_is_boost: {
    type: String,
    default: "",
  },
  c_status: {
    type: String,
    default: "",
  },
  c_created_at: {
    type: String,
    default: "",
  },
  c_last_login: {
    type: String,
    default: "",
  },
  c_edit_name: {
    type: String,
    default: "",
  },
  c_google_token: {
    type: String,
    default: "",
  },
  c_otp: String,
  otp_verified: String,
  c_is_verified:{
    type:Boolean,
    default:false
  },
  c_home:{
    type:String,
    default:""
  },
  c_educational_level:{
    type:String,
    default:""
  },
  c_work:{
    type:String,
    default:""
  },
  c_zodiac:{
    type:String,
    default:""
  },
  c_religion:{
    type:String,
    default:""
  },
  c_notification:{
    type:String,
    default:""
  },
  c_age:Number,
  c_highlights:[],
  has_like:Boolean,
  Highlights:[]
  
},{
  timestamps:true
});
// UserSchema.index({coordinates:"2dsphere"})
module.exports = mongoose.model("User", UserSchema);
