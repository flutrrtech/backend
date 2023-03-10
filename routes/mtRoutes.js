const express = require("express");
const router = express.Router();

const {addSuperLike,addLike,fetchMt,removeFreeLike,removeFreeSuperLike,removePaidLike,removePaidSuperLike,
addPaidRewind,removePaidRewind,removeFreeRewind,addAudioTime,addVideoTime,addBoost,addMTLog,unlockTopPick,unlockLike,removePaidUnlockToppick,removeUnlockLikePaid,removeUnlockLikeFree,removeFreeUnlockToppick}=require("../controller/microTransaction")






router.post("/addsuperlike", addSuperLike);
router.post("/addLike", addLike);
router.post("/fetchmt", fetchMt);
router.post("/removefreelike", removeFreeLike);
router.post("/removefreesuperlike", removeFreeSuperLike);
router.post("/removepaidlike", removePaidLike);
router.post("/removepaidsuperlike", removePaidSuperLike);
router.post("/addpaidrewind", addPaidRewind);
router.post("/removepaidrewind", removePaidRewind);
router.post("/removefreerewind", removeFreeRewind);
router.post("/addaudiotime", addAudioTime);
router.post("/addvideotime", addVideoTime);
router.post("/addboost", addBoost);
router.post("/addmtlog", addMTLog);
router.post("/unlocktoppick", unlockTopPick);
router.post("/unlocklike", unlockLike);
router.post("/removeunlocktoppick", removePaidUnlockToppick);
router.post("/removeunlocklikepaid", removeUnlockLikePaid);
router.post("/removeunlocklikefree", removeUnlockLikeFree);
router.post("/removeunlocktoppickfree", removeFreeUnlockToppick);
module.exports = router;