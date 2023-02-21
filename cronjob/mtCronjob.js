var cron = require('node-cron');
const User=require("../model/User")
const CustomerTopPick=require("../model/topPick")
const CustomerLike=require("../model/customerLike")
const CustomerMt=require("../model/microTransaction")
cron.schedule('* * * * * *', async() => {

  var transactionAll=await CustomerMt.find()
  for(var i=0;i<transactionAll.length;i++){
    transactionAll[i].cmm_free_like="25"
    transactionAll[i].cmm_free_super_like="1"
    transactionAll[i].cmm_free_rewind="1"
    transactionAll[i].cmm_free_unlock_toppick="1"
    transactionAll[i].cmm_free_unlock_like="1"
    await transactionAll[i].save()
  }


//    console.log("Startted")


})