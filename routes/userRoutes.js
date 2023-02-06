const express = require("express");
const router = express.Router();
const {
  getUser,
  userRegistration,
  verifyOtp,
  addMoreDetails,
  uploadProfilePhoto,
  facebookLogin,
  emailLogin,
  requestOtp,
  otpLogin,
  verifySelfie,
  reportProfile,
  sendMatch,
  deleteProfileImage,
  updateProfile,
  addHighlight,
  deleteHighlight,
  getSwipeData,
  userVerified,
  updatePreference,
  getPreference,
  getSuperLike,
  frezzeBasicInfo,
  ghostMode,
  deleteUser,
  settingUser,
  getUserSetting,
  reportSelfie,
  updateSelfie,
  resetPreference,
  getHighLight,
  updateHighLights
} = require("../controller/user");
const {
  customerLike,
  customerSuperLike,
  getLikedUser
  
} = require("../controller/customerLike");
const {
  customerReject,
  customerRewindReject
} = require("../controller/customerReject");
const path = require("path");
const multer = require("multer");
const verifyToken = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
// Handling request using router
router.post("/getuser", getUser);
router.post("/userregistration", userRegistration);
router.post("/verifyotp", verifyOtp);
router.post("/addmoredetails", addMoreDetails);
router.post(
  "/uploadprofilephotos",
  upload.fields([
    { name: "user_profile_image_1" },
    { name: "user_profile_image_2" },
    { name: "user_profile_image_3" },
    { name: "user_profile_image_4" },
    { name: "user_profile_image_5" },
  ]),
  uploadProfilePhoto
);
router.post("/facebooklogin", facebookLogin);
router.post("/emaillogin", emailLogin);
router.post("/requestotp", requestOtp);
router.post("/otplogin", otpLogin);
router.post("/verifySelfie", verifySelfie);
router.post("/deleteprofileimage", deleteProfileImage);
router.post("/updateprofile", updateProfile);
router.post("/getswipedata", getSwipeData);
router.post("/userverified", userVerified);
router.post("/frezzebasicinfo", frezzeBasicInfo);
router.post("/ghostMode", ghostMode);
router.post("/deleteuser", deleteUser);
router.post("/settinguser", settingUser);
router.post("/getsettinguser", getUserSetting);
router.post("/resetpreference", resetPreference);
router.post("/updateselfie",upload.single('image'), updateSelfie);
//customer higlght management

router.post("/addhighlight",upload.array("image",1), addHighlight);
router.post("/deletehighlight", deleteHighlight);
router.post("/gethighlight", getHighLight);
router.post("/updatehighlight",upload.array("image"), updateHighLights);
//customer like management
router.post("/customerlike", customerLike);
router.post("/customersuperlike", customerSuperLike);
router.post("/getlikeduser", getLikedUser);
router.post("/getsuperlike", getSuperLike);

//customer reject management
router.post("/customerreject", customerReject);
router.post("/customerrewindreject", customerRewindReject);
//customer report
router.post("/customerreportprofile", reportProfile);

router.post("/customersendmatch", sendMatch);
router.post("/customerreportselfie", reportSelfie);
//preference
router.post("/customerupdatepreference",updatePreference )
router.post("/customergetpreference",getPreference )

// Importing the router
module.exports = router;
