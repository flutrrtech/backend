var cron = require('node-cron');
const User=require("../model/User")
const CustomerTopPick=require("../model/topPick")
const CustomerLike=require("../model/customerLike")
cron.schedule('* * * * * *', async() => {
  var totalUser=await User.find()
  var flag=0
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
        if(count>=2&& flag<=12){
            var likeCount=await CustomerLike.find({clm_receiver_unique_id:totalUser[i].c_unique_id})
            if(likeCount.length>2&&totalUser[i].c_gender=="Man"||likeCount.length>15&&totalUser[i].c_gender=="Woman"){
                var customerTopPick=new CustomerTopPick()
                customerTopPick.c_unique_id=totalUser[i].c_unique_id
                customerTopPick.c_gender=totalUser[i].c_gender=="Man"?"Woman":"Man"
                await CustomerTopPick.save()
                flag++
            }
        }
    }
  }
});