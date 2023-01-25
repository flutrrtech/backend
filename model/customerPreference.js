const mongoose = require("mongoose");
const customerPreferenceSchema = new mongoose.Schema(
  {
    cp_id: String,
    cp_user_id: String,
    cp_c_unique_id: String,
    cp_passion_1:String,
    cp_passion_2:String,
    cp_passion_3:String,
    cp_age_from:String,
    cp_age_to:String,
    cp_distance_upto:String,
    cp_see_pan_india_profile:String,
    cp_users_bio:String

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CustomerPreference", customerPreferenceSchema);