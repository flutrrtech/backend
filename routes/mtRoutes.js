const express = require("express");
const router = express.Router();

const {addSuperLike,addLike,fetchMt}=require("../controller/microTransaction")






router.post("/addsuperlike", addSuperLike);
router.post("/addLike", addLike);
router.post("/fetchmt", fetchMt);








module.exports = router;