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
  reportProfile
} = require("../controller/user");
const {
  customerLike,
  customerSuperLike
  
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
//customer like management
router.post("/customerlike", customerLike);
router.post("/customersuperlike", customerSuperLike);


//customer reject management
router.post("/customerreject", customerReject);
router.post("/customerrewindreject", customerRewindReject);
//customer report
router.post("/customerreportprofile", reportProfile);
// Importing the router
module.exports = router;
