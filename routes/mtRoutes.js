const express = require("express");
const router = express.Router();

const {addSuperLike,addLike,fetchMt,removeFreeLike,removeFreeSuperLike,removePaidLike,removePaidSuperLike,
addPaidRewind,removePaidRewind,removeFreeRewind}=require("../controller/microTransaction")






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


module.exports = router;