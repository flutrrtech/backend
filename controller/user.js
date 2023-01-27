const User = require("../model/User");
const { randomOtpGenerator } = require("../helper/otpGenerate");
const { sendOtp } = require("../helper/sendOtp");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const CustomerReport = require("../model/customerReport");
const CustomerMatch = require("../model/customerMatch");
const CustomerLike = require("../model/customerLike");
const CustomerReject = require("../model/customerReject");
const CustomerHighlight = require("../model/customerHighlight");
const CustomerPreference = require("../model/customerPreference");
const CustomerTopPick= require("../model/topPick");
var format = require('date-format');
const { URLSearchParams } = require("url");
const fs = require("fs");

/* user registration
  post
  */
exports.userRegistration = async (req, res) => {
  if (req.body.user_phone != "") {
    var findUserPhone = await User.findOne({
      c_phone: req.body.user_phone,
    });
  }
  if (req.body.user_email != "") {
    var findUserEmail = await User.findOne({
      c_email: req.body.user_email,
    });
  }
  if (req.body.user_facebook_token != "") {
    var findUserFacebookToken = await User.findOne({
      c_facebook_token: req.body.user_facebook_token,
    });
  }

  if (findUserPhone || findUserEmail || findUserFacebookToken) {
    return res.status(200).json({
      status: 0,
      message: "User Already Exist",
    });
  }
  let user = new User();
  (user.c_response_type = req.body.user_response_type),
    (user.c_phone = req.body.user_phone),
    (user.c_email = req.body.user_email),
    (user.c_f_name = req.body.user_f_name),
    (user.c_l_name = req.body.user_l_name),
    (user.c_lang = req.body.user_lang),
    (user.c_firebase_token = req.body.user_firebase_token),
    (user.c_device_info = req.body.user_device_info),
    (user.c_facebook_token = req.body.user_facebook_token);
  let otp = await randomOtpGenerator();
  user.c_otp = otp;
  user.otp_verified = "1";
  let result = await user.save();
  result.c_unique_id = result._id;
  await result.save();
  if (req.body.user_phone) {
    await sendOtp(req.body.user_phone, otp);
  }
  return res.status(200).json({
    status: 1,
    message: "User Created Successfully",
    unique_id: result._id,
  });
};
/* verify otp- post */
exports.verifyOtp = async (req, res) => {
  var user = await User.findOne({ c_unique_id: req.body.unique_id });
  if (user) {
    console.log(user.otp, req.body.otp);
    if (user.c_otp == req.body.otp) {
      user.otp_verified = "2";
      await user.save();
      return res.status(200).json({
        status: true,
        message: "Otp verified",
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Otp not verified",
      });
    }
  } else {
    return res.status(200).json({ status: false, message: "User not found" });
  }
};
/*add more details to profile
post*/
exports.addMoreDetails = async (req, res) => {
  try {
    var findUser = await User.findOne({ c_unique_id: req.body.unique_id });
    if (findUser) {
      findUser.c_dob = req.body.user_dob;
      findUser.c_gender = req.body.user_gender;
      findUser.c_gender_preference = req.body.user_gender_preference;
      findUser.c_passion_1 = req.body.user_passion_1;
      findUser.c_passion_2 = req.body.user_passion_2;
      findUser.c_gender_display = req.body.user_gender_display;
      findUser.c_lat = req.body.user_lat;
      findUser.c_long = req.body.user_long;
      findUser.otp_verified = "3";
      var result = await findUser.save();
      return res.status(200).json({
        status: 1,
        user_data: result,
        message: "User Data Saved Successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "User Not Found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};
/* update profile photo and bio
post */
exports.uploadProfilePhoto = async (req, res) => {
  console.log(req.files);
  try {
    const findUser = await User.findOne({ c_unique_id: req.body.unique_id });
    if (findUser) {
      if (
        req.files.user_profile_image_1 &&
        req.files.user_profile_image_1.length > 0
      ) {
        findUser.c_profile_image_1 = req.files.user_profile_image_1[0].filename;
      }
      if (
        req.files.user_profile_image_2 &&
        req.files.user_profile_image_2.length > 0
      ) {
        findUser.c_profile_image_2 = req.files.user_profile_image_2[0].filename;
      }
      if (
        req.files.user_profile_image_3 &&
        req.files.user_profile_image_3.length > 0
      ) {
        findUser.c_profile_image_3 = req.files.user_profile_image_3[0].filename;
      }
      if (
        req.files.user_profile_image_4 &&
        req.files.user_profile_image_4.length > 0
      ) {
        findUser.c_profile_image_4 = req.files.user_profile_image_4[0].filename;
      }
      if (
        req.files.user_profile_image_5 &&
        req.files.user_profile_image_5.length > 0
      ) {
        findUser.c_profile_image_5 = req.files.user_profile_image_5[0].filename;
      }
      if (req.body.bio) {
        findUser.c_bio = req.body.bio;
      }
      await findUser.save();
      return res.status(200).json({
        status: 1,
        message: "File Uploaded Successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "User Not Found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};
/* get user detail by unique id */
exports.getUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ c_unique_id: req.body.unique_id });
    if (findUser) {
      return res.status(200).json({
        status: 1,
        user_data: findUser,
        message: "User data fetched successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "User data not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};
/* facebook login
post */
exports.facebookLogin = async (req, res) => {
  try {
    const findUser = await User.findOne({
      c_facebook_token: req.body.user_facebook_token,
    });
    if (findUser) {
      var token = await jwt.sign(
        { unique_id: findUser._id },
        process.env.SECRET,
        { expiresIn: "24h" }
      );
      return res.status(200).json({
        status: 1,
        user_token: token,
        message: "User Logged In Successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "User data not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};
/* email login
  post */
exports.emailLogin = async (req, res) => {
  try {
    const findUser = await User.findOne({ c_email: req.body.user_email });
    if (findUser) {
      var token = await jwt.sign(
        { unique_id: findUser._id },
        process.env.SECRET,
        { expiresIn: "24h" }
      );
      return res.status(200).json({
        status: 1,
        user_token: token,
        message: "User Logged In Successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "User data not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};
/* request otp
  post */
exports.requestOtp = async (req, res) => {
  try {
    const findUser = await User.findOne({ c_phone: req.body.user_phone });
    if (findUser) {
      var otp = await randomOtpGenerator();
      findUser.c_otp = otp;

      await sendOtp(req.body.user_phone, otp);

      await findUser.save();
      return res.status(200).json({
        status: 1,
        message: "User OTP Send Successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "User data not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

/* otp login
post */
exports.otpLogin = async (req, res) => {
  try {
    const findUser = await User.findOne({ c_phone: req.body.user_phone });
    if (findUser) {
      if (findUser.c_otp == req.body.user_otp) {
        var token = await jwt.sign(
          { unique_id: findUser._id },
          process.env.SECRET,
          { expiresIn: "24h" }
        );
        return res.status(200).json({
          status: 1,
          user_token: token,
          message: "User Logged In Successfully",
        });
      } else {
        return res.status(200).json({
          status: 0,
          message: "Incorrect OTP",
        });
      }
    } else {
      return res.status(200).json({
        status: 0,
        message: "User data not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

/*selfie verify 
post */
exports.verifySelfie = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { c_unique_id: req.body.unique_id },
      { c_selfie_verify: req.body.user_selfie_verify },
      { new: true }
    );
    return res.status(200).json({
      status: 1,
      message: "User Selfie Verified",
    });
  } catch (err) {
    return res.status(200).json({
      status: 0,
      message: err.message,
    });
  }
};
/* report profile
post */
exports.reportProfile = async (req, res) => {
  try {
    var customerReport = new CustomerReport();
    customerReport.cr_send_user_unique_id = req.body.send_user_unique_id;
    customerReport.cr_for_user_unique_id = req.body.for_user_unique_id;
    customerReport.cr_report_heading = req.body.report_heading
      ? req.body.report_heading
      : "";
    customerReport.cr_report_matter = req.body.report_matter
      ? req.body.report_matter
      : "";
    var result = await customerReport.save();
    result.cr_id = result._id;
    await result.save();
    return res.status(200).json({
      status: 1,
      message: "Report Submitted Successfully",
    });
  } catch (err) {
    return res.status(200).json({
      status: 0,
      message: err.message,
    });
  }
};

exports.sendMatch = async (req, res) => {
  try {
    var customerSendMatch = new CustomerMatch();
    customerSendMatch.cmm_sender_unique_id = req.body.logged_in_unique_id;
    customerSendMatch.cmm_receiver_unique_id = req.body.receiver_unique_id;
    customerSendMatch.cmm_match_time = new Date();
    var result = await customerSendMatch.save();
    result.cmm_id = result._id;
    await result.save();
    return res.status(200).json({
      status: 1,
      message: "Match data added Successfully",
    });
  } catch (err) {
    return res.status(200).json({
      status: 0,
      message: err.message,
    });
  }
};
/* Profile Image Delete
Post */
exports.deleteProfileImage = async (req, res) => {
  try {
    console.log(Object.keys(req.body)[1]);
    var txt = Object.keys(req.body)[1];
    var replace = txt.replace(/user/g, "c");
    console.log(replace);
    var findUser = await User.findOne({ c_unique_id: req.body.unique_id });

    var resultHandler = function (err) {
      if (err) {
        console.log("unlink failed", err);
      } else {
        console.log("file deleted");
      }
    };
    if (req.body.user_profile_image_1 && req.body.user_profile_image_1 === "") {
      await fs.unlink(`uploads/${findUser.c_profile_image_1}`, resultHandler);
      findUser.c_profile_image_1 = "";
      await findUser.save();
      return res.status(200).json({
        status: 1,
        message: "Image Deleted Successfully",
      });
    } else if (
      req.body.user_profile_image_2 &&
      req.body.user_profile_image_2 === ""
    ) {
      await fs.unlink(`uploads/${findUser.c_profile_image_2}`, resultHandler);
      findUser.c_profile_image_2 = "";
      await findUser.save();
      return res.status(200).json({
        status: 1,
        message: "Image Deleted Successfully",
      });
    } else if (
      req.body.user_profile_image_3 &&
      req.body.user_profile_image_3 === ""
    ) {
      await fs.unlink(`uploads/${findUser.c_profile_image_3}`, resultHandler);
      findUser.c_profile_image_3 = "";
      await findUser.save();
      return res.status(200).json({
        status: 1,
        message: "Image Deleted Successfully",
      });
    } else if (
      req.body.user_profile_image_4 &&
      req.body.user_profile_image_4 === ""
    ) {
      await fs.unlink(`uploads/${findUser.c_profile_image_4}`, resultHandler);
      findUser.c_profile_image_4 = "";
      await findUser.save();
      return res.status(200).json({
        status: 1,
        message: "Image Deleted Successfully",
      });
    } else if (
      req.body.user_profile_image_5 &&
      req.body.user_profile_image_5 === ""
    ) {
      await fs.unlink(`uploads/${findUser.c_profile_image_5}`, resultHandler);
      findUser.c_profile_image_5 = "";
      await findUser.save();
      return res.status(200).json({
        status: 1,
        message: "Image Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "Image Not Found",
      });
    }
  } catch (err) {
    return res.status(200).json({
      status: 0,
      message: err.message,
    });
  }
};
/* update profile
 post */
exports.updateProfile = async (req, res) => {
  try {
    const findUser = await User.findOne({ c_unique_id: req.body.unique_id });
    if (findUser) {
      if (req.body.user_f_name) {
        findUser.c_f_name = req.body.user_f_name;
      }
      if (req.body.user_l_name) {
        findUser.c_l_name = req.body.user_l_name;
      }
      if (req.body.user_initial_name) {
        findUser.c_initial_name = req.body.user_initial_name;
      }
      if (req.body.user_dob) {
        findUser.c_dob = req.body.user_dob;
        var today = new Date();
        var dob=req.body.user_dob.split('/')
        req.body.user_dob=dob[2]+"-"+dob[1]+"-"+dob[0]
                // req.user_dob=format(req.body.user_dob)
        var birthDate = new Date(req.body.user_dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        console.log(age)
        findUser.c_age = age;
      }
      if (req.body.user_gender) {
        findUser.c_gender = req.body.user_gender;
      }
      if (req.body.user_gender_preference) {
        findUser.c_gender_preference = req.body.user_gender_preference;
      }
      if (req.body.user_here_for) {
        findUser.c_here_for = req.body.user_here_for;
      }
      if (req.body.user_passion_1) {
        findUser.c_passion_1 = req.body.user_passion_1;
      }
      if (req.body.user_passion2) {
        findUser.c_passion2 = req.body.user_passion2;
      }
      if (req.body.user_lang) {
        findUser.c_lang = req.body.user_lang;
      }
      if (req.body.user_bio) {
        findUser.c_bio = req.body.user_bio;
      }
      if (req.body.user_gender_display) {
        findUser.c_gender_display = req.body.user_gender_display;
      }
      if (req.body.user_display_name) {
        findUser.c_display_name = req.body.user_display_name;
      }
      if (req.body.user_long) {
        findUser.c_long = req.body.user_long;
      }
      if (req.body.user_lat) {
        findUser.c_lat = req.body.user_lat;
      }
      if (req.body.user_device_info) {
        findUser.c_device_info = req.body.user_device_info;
      }
      if (req.body.user_educational_qualification) {
        findUser.c_educational_qualification =
          req.body.user_educational_qualification;
      }
      if (req.body.user_institution) {
        findUser.c_institution = req.body.user_institution;
      }
      if (req.body.user_profession) {
        findUser.c_profession = req.body.user_profession;
      }
      await findUser.save();
      return res.status(200).json({
        status: 1,
        message: "Updated Successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(200).json({
      status: 0,
      message: err.message,
    });
  }
};
/* get swipe data
 post */
exports.getSwipeData = async (req, res) => {
  try {
    var user = await User.findOne({ c_unique_id:req.body.logged_in_unique_id });

    //get user like profile
    var likeUser = await CustomerLike.find({
      clm_sender_unique_id: req.body.logged_in_unique_id,
    }).select("clm_receiver_unique_id");
    var arr = await likeUser.map((item) => {
      return item.clm_receiver_unique_id;
    });
    //
    //rejected user list
    var customerReject = [];
    if (user.c_gender === "Men") {
      customerReject = await customerReject.find({
        crm_sender_unique_id: req.body.logged_in_unique_id,
        crm_reject_unique_id: { $gt: 2 },
      });
    } else {
      customerReject = await CustomerReject.find({
        crm_sender_unique_id: req.body.logged_in_unique_id,
      });
    }
    var arr2 = await customerReject.map((item) => {
      return item.crm_receiver_unique_id;
    });
    // console.log(likeUser);
    var response = await User.find({
      $and: [{c_unique_id:{$ne:req.body.logged_in_unique_id}},{ c_unique_id: { $nin: arr } }, { c_unique_id: { $nin: arr2 }, },{c_age:{$gt:user.c_age-5,$lt:user.c_age+5}},{c_gender:user.c_gender_preference}],
    }).sort({c_is_boost:-1}).limit(20);
    // var result = await User.aggregate([
    //   {
    //     $geoNear: {
    //        near: { type: "Point", coordinates: [  34.5435, 66.1313  ] },
    //        distanceField: "0.1"
    //     }
    //   }
    // ]);
    return res.status(200).json({
      status: 1,
      message:"Data Fetched Successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

//add update highlight
exports.addHighlight = async (req, res) => {
  try {
    var findHighlight = await CustomerHighlight.findOne({
      ch_unique_id: req.body.unique_id,
    });
    if (findHighlight) {
      var obj;
      if (req.body.highlight && req.body.highlight.length > 0) {
        JSON.parse(req.body.highlight);
      }
      for (var i = 0; i < findHighlight.ch_highlight.length; i++) {
        if (findHighlight.ch_highlight[i]._id == req.body.id) {
          console.log("hi");
          console.log(req.body.highlight[0].description);
          if (req.body.highlight && req.body.highlight[0].title) {
            findHighlight.ch_highlight[i].title = req.body.highlight[0].title;
          }
          if (req.body.highlight && req.body.highlight[0].description) {
            findHighlight.ch_highlight[i].description =
              req.body.highlight[0].description;
          }
          if (req.files.length > 0) {
            findHighlight.ch_highlight[
              i
            ].image = `uploads/${req.files[0].originalname}`;
          }
          var result = await findHighlight.save();
        }
      }

      return res.status(200).json({
        status: 1,
        message: "Highlight Updated Successfully",
        data: result,
      });
    } else {
      var addHighlight = new CustomerHighlight();
      addHighlight.c_unique_id = req.body.unique_id;
      for (var i = 0; i < req.body.highlight.length; i++) {
        var item = JSON.parse(req.body.highlight[i]);
        console.log(item);
        var obj = {
          title: item.title,
          description: item.description,
          image: req.files[i] ? `uploads/${req.files[i].originalname}` : "",
        };
        addHighlight.ch_highlight.push(obj);
      }
      var result = await addHighlight.save();
      result.ch_id = result._id;
      await result.save();
      return res.status(200).json({
        status: 1,
        message: "Highlight added successfulyy",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};
//delete Highlightes
exports.deleteHighlight = async (req, res) => {
  try {
    var result = await CustomerHighlight.update(
      { ch_id: req.body.unique_id },
      {
        $pull: {
          ch_highlight: {
            _id: req.body.id,
          },
        },
      }
    );
    return res.status(200).json({
      status: 1,
      message: "Highlight deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

//user verified
exports.userVerified = async (req, res) => {
  try {
    let findUser = await User.findOne({ c_unique_id: req.body.unique_id });
    if (findUser) {
      findUser.c_is_verified = true;
      await findUser.save();
      return res.status(200).json({
        status: 1,
        message: "User Verified Successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "User Not Found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

exports.getTopPick=async(req,res)=>{
  try{
  var findUser=await User.findOne({c_unique_id:req.body.logged_in_unique_id})
  if(findUser){
    var result
    var length=await CustomerTopPick.find()
   if(findUser.c_gender=="Male"){
     result=await CustomerTopPick.find({c_gender:"Female"})
    .limit(6)
    .skip(Math.floor(Math.random() * length))
    .next()
   }else{
     result=await CustomerTopPick.find({c_gender:"Male"})
    .limit(6)
    .skip(Math.floor(Math.random() * length))
    .next()
   }
   var arr=[]
   await result.map(async(item)=>{
    var res=await User.findOne({c_unique_id:item.c_unique_id})
    arr.push(res)
   })
   return res.status(200).json({
    status:1,
    messgae:"Top picked data sent",
    data:arr
   })
  }
  }catch(err){
    return res.status(500).json({
      status:0,
      message:err.message
    })
  }
}
/* set customer preference
 post */
 exports.updatePreference=async(req,res)=>{
  try{
    var findCustomer=await CustomerPreference.findOne({cp_c_unique_id:req.body.logged_in_unique_id})
    if(findCustomer){
      findCustomer.cp_passion_1=req.body.passion_1!=""?req.body.passion_1:findUser.cp_passion_1
      findCustomer.cp_passion_2=req.body.passion_2!=""?req.body.passion_2:findUser.cp_passion_2
      findCustomer.cp_passion_3=req.body.passion_3!=""?req.body.passion_3:findUser.cp_passion_3
      findCustomer.cp_age_from=req.body.age_from!=""?req.body.age_from:findUser.cp_age_from
      findCustomer.cp_age_to=req.body.age_to!=""?req.body.age_to:findUser.cp_age_to
      findCustomer.cp_distance_upto=req.body.distance_upto!=""?req.body.distance_upto:findUser.cp_distance_upto
      findCustomer.cp_see_pan_india_profile=req.body.see_pan_india_profile!=""?req.body.see_pan_india_profile:findUser.cp_see_pan_india_profile
      findCustomer.cp_users_with_bio=req.body.users_with_bio!=""?req.body.users_with_bio:findUser.cp_users_with_bio
      await findUser.save()
      return  res.status(200).json({
        status:1,
        message:"Preferemnce Updated Successfully"
      })
    }else{
      var newPreference=new CustomerPreference()
      newPreference.cp_c_unique_id=req.body.unique_id
      newPreference.cp_passion_1=req.body.passion_1!=""?req.body.passion_1:""
      newPreference.cp_passion_2=req.body.passion_2!=""?req.body.passion_2:""
      newPreference.cp_passion_3=req.body.passion_3!=""?req.body.passion_3:""
      newPreference.cp_age_from=req.body.age_from!=""?req.body.age_from:""
      newPreference.cp_age_to=req.body.age_to!=""?req.body.age_to:""
      newPreference.cp_distance_upto=req.body.distance_upto!=""?req.body.distance_upto:""
      newPreference.cp_see_pan_india_profile=req.body.see_pan_india_profile!=""?req.body.see_pan_india_profile:""
      newPreference.cp_users_with_bio=req.body.users_with_bio!=""?req.body.users_with_bio:""

      await newPreference.save()
      return  res.status(200).json({
        status:1,
        message:"Preferemnce Updated Successfully"
      })
    }

  }catch(err){
    return res.status(500).json({
      status:0,
      message:err.message
    })
  }
 }
 /* get preference
  */
 exports.getPreference=async(req,res)=>{
  try{
    var getPreference=await CustomerPreference.findOne({cp_c_unique_id:req.body.logged_in_unique_id})
    if(getPreference){
      return res.status(200).json({
        status:1,
        message:"Data Fetched Successfully",
        data:getPreference
      })
    }else{
      return res.status(200).json({
        status:0,
        message:"Data Not Found",
        
      })
    }
  }catch(err){
    return res.status(500).json({
      status:0,
      message:err.message
    })
  }
 }
 
 /* get super like
 post */
 exports.getSuperLike=async(req,res)=>{
  // try{
    var user = await User.findOne({ c_unique_id:req.body.unique_id });
    
    //like management
    var likeUser = await CustomerLike.find({
      clm_sender_unique_id: req.body.unique_id,
    }).select("clm_receiver_unique_id");
    var arr = await likeUser.map((item) => {
      return item.clm_receiver_unique_id;
    });
    //reject management
    var customerReject = [];
    if (user.c_gender === "Men") {
      customerReject = await customerReject.find({
        crm_sender_unique_id: req.body.unique_id,
        crm_reject_unique_id: { $gt: 2 },
      });
    } else {
      customerReject = await CustomerReject.find({
        crm_sender_unique_id: req.body.unique_id,
      });
    }
    var arr2 = await customerReject.map((item) => {
      return item.crm_receiver_unique_id;
    });
    var result=await CustomerLike.aggregate([
      {$match:{clm_receiver_unique_id:user.c_unique_id}},
     {
      
      $lookup:{
        from:'users',
        "localField":"clm_sender_unique_id",
        "foreignField":"c_unique_id",
        "as":"Customer_Detail"

      }
      
     },
     
      {$match:{clm_is_super_like:1}},
      {$match:{clm_sender_unique_id:{$nin:arr}}},
      {$match:{clm_sender_unique_id:{$nin:arr2}}},
     
    ])
  return res.status(200).json({
    status:1,
    message:"Super liked data fetched successfully",
    data:result

  })
  // }catch(err){
  //   return res.status(500).json({
  //     status:0,
  //     message:err.message
  //   })
  // }
 }

 /* frezze basic info by user
   post */

   exports.frezzeBasicInfo=async(req,res)=>{
    try{
     var findUser=await User.findOne({c_unique_id:req.body.loggedin_unique_id})
     if(findUser){
      findUser.c_freeze_basic_info=req.body.val
      await findUser.save()
      return res.status(200).json({
        status:1,
        message:"Data Updated Successfuly"
      })
     }else{
      return res.status(200).json({
        status:0,
        message:"User Not Found"
      })
     }
    }catch(err){
      return res.status(500).json({
        status:0,
        message:err.message
      })
    }
   }

/* ghost mode
 post */
   exports.ghostMode=async(req,res)=>{
    try{
     var findUser=await User.findOne({c_unique_id:req.body.loggedin_unique_id})
     if(findUser){
      findUser.c_is_ghost_mode=req.body.val
      await findUser.save()
      return res.status(200).json({
        status:1,
        message:"Data Updated Successfuly"
      })
     }else{
      return res.status(200).json({
        status:0,
        message:"User Not Found"
      })
     }
    }catch(err){
      return res.status(500).json({
        status:0,
        message:err.message
      })
    }
   }