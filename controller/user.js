const User = require("../model/User");
const { randomOtpGenerator } = require("../helper/otpGenerate");
const { sendOtp } = require("../helper/sendOtp");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const CustomerReport = require("../model/customerReport");
const CustomerMatch = require("../model/customerMatch");
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
exports.updateProfile=async(req,res)=>{
  try{
    const findUser=await User.findOne({c_unique_id:req.body.unique_id})
    if(findUser){
        if(req.body.user_f_name){
          findUser.c_f_name=req.body.user_f_name
        }
        if(req.body.user_l_name){
          findUser.c_l_name=req.body.user_l_name
        }
        if(req.body.user_initial_name){
          findUser.c_initial_name=req.body.user_initial_name
        }
        if(req.body.user_dob){
          findUser.c_dob=req.body.user_dob
        }
        if(req.body.user_gender){
          findUser.c_gender=req.body.user_gender
        }
        if(req.body.user_gender_preference){
          findUser.c_gender_preference=req.body.user_gender_preference
        }
        if(req.body.user_here_for){
          findUser.c_here_for=req.body.user_here_for
        }
        if(req.body.user_passion_1){
          findUser.c_passion_1=req.body.user_passion_1
        }
        if(req.body.user_passion2){
          findUser.c_passion2=req.body.user_passion2
        }
        if(req.body.user_lang){
          findUser.c_lang=req.body.user_lang
        }
        if(req.body.user_bio){
          findUser.c_bio=req.body.user_bio
        }
        if(req.body.user_gender_display){
          findUser.c_gender_display=req.body.user_gender_display
        }
        if(req.body.user_display_name){
          findUser.c_display_name=req.body.user_display_name
        }
        if(req.body.user_long){
          findUser.c_long=req.body.user_long
        }
        if(req.body.user_lat){
          findUser.c_lat=req.body.user_lat
        }
        if(req.body.user_device_info){
          findUser.c_device_info=req.body.user_device_info
        }
        if(req.body.user_educational_qualification){
          findUser.c_educational_qualification=req.body.user_educational_qualification
        }
        if(req.body.user_institution){
          findUser.c_institution=req.body.user_institution
        }
        if(req.body.user_profession){
          findUser.c_profession=req.body.user_profession
        }
        await findUser.save()
        return res.status(200).json({
          status:1,
          message:"Updated Successfully"
        })
    }else{
      return res.status(200).json({
        status:0,
        message:"User not found"
      })
    }
  }catch(err){
    return res.status(200).json({
      status:0,
      message:err.message
    })
  }
}