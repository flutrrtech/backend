const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    clm_id:String,
    clm_sender_unique_id: String,
    clm_receiver_unique_id: String,
    clm_like_time: {
        type:Date,
        default:new Date()
    },
    clm_is_super_like:{
        type:Number,
        default:0
    },
    clm_super_like_time:{
        type:Number,
        default:0
    },
    clm_super_like_msg: {
        type:String
    },

},{
    timestamps:true
});


module.exports = mongoose.model("CustomerLike", UserSchema);