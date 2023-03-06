var MTmodel=require('../model/microTransaction')
var User=require("../model/User")
var cron = require('node-cron');

cron.schedule('* * * * * *', async() => {
   var mtAll=await MTmodel.find()
   for(var i=0;i<mtAll.length;i++){
    if(new Date()>new Date(mtAll[i].cmm_boost_end)){
        console.log("called")
       await User.findOneAndUpdate({c_unique_id:mtAll[i].cmm_c_unique_id},{c_is_boost:"0"},{new:true})
    }
   }





})
