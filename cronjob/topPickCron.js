var cron = require('node-cron');
const User=require("../model/User")
const CustomerTopPick=require("../model/topPick")
const CustomerLike=require("../model/customerLike")
cron.schedule('* * * * * *', async() => {
  var totalUser=await User.find()
  var manFlag=0
  var womanFlag=0
  console.log("called")
  for(var i=0;i<totalUser.length;i++){
    
    var findUser=await CustomerTopPick.findOne({c_unique_id:totalUser[i].c_unique_id})
    
    if(!findUser){
        var count=0
        if(totalUser[i].c_profile_image_1!=""){
            count++
        }
        if(totalUser[i].c_profile_image_2!=""){
            count++
        }
        if(totalUser[i].c_profile_image_3!=""){
            count++
        }
        if(totalUser[i].c_profile_image_4!=""){
            count++
        }
        if(totalUser[i].c_profile_image_5!=""){
            count++
        }
        if(count>=2 && manFlag<=6){
            var likeCount=await CustomerLike.find({clm_receiver_unique_id:totalUser[i].c_unique_id})
            if(likeCount.length>2&&totalUser[i].c_gender=="Man"){
                var findUser=await CustomerTopPick.findOne({c_unique_id:totalUser[i].c_unique_id})
                if(!findUser){
                    var customerTopPick=new CustomerTopPick()
                    customerTopPick.c_unique_id=totalUser[i].c_unique_id
                    customerTopPick.c_gender="Man"
                    await CustomerTopPick.save()
                    manFlag++
                }
                 
                
            }
        }
        if(count>=2 && womanFlag<=6){
            if(likeCount.length>15&&totalUser[i].c_gender=="Woman"){
                var findUser=await CustomerTopPick.findOne({c_unique_id:totalUser[i].c_unique_id})
                if(!findUser){
                var customerTopPick=new CustomerTopPick()
                customerTopPick.c_unique_id=totalUser[i].c_unique_id
                customerTopPick.c_gender="Woman"
                await CustomerTopPick.save()
                womanFlag++
                }
                
            }
        }

    }
  }
});