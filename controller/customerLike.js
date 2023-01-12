
const CustomerLike = require("../model/customerLike");
// user send like
exports.customerLike=async(req,res)=>{
    try{
        var likeExist=await CustomerLike.findOne({clm_sender_unique_id:req.body.loggedin_unique_id,clm_receiver_unique_id:req.body.clm_receiver_unique_id})
        if(likeExist){
            likeExist.clm_like_time=new Date()
            await likeExist.save()
            return res.status(200).json({
                status:1,
                message:"User Already Liked"
            })
        }else{
            var customerLike=new CustomerLike()
            customerLike.clm_sender_unique_id=req.body.loggedin_unique_id
            customerLike.clm_receiver_unique_id=req.body.user_receiver_unique_id
            
            var result=await customerLike.save()
            result.clm_id=result._id
            result.clm_like_time=new Date()
            await result.save();
            return res.status(200).json({
                status:1,
                message:"User liked Successfully",
                return:[]
        
            })
        }
   

    }catch(err){
        return res.status(500).json({
            status:0,
            message:err.message
        })
    }
}

exports.customerSuperLike=async(req,res)=>{
    try{
        var likeExist=await CustomerLike.findOne({clm_sender_unique_id:req.body.loggedin_unique_id,clm_receiver_unique_id:req.body.clm_receiver_unique_id})
        if(likeExist){
            likeExist.clm_like_time=new Date()
            await likeExist.save()
            return res.status(200).json({
                status:1,
                message:"User Already Liked"
            })
        }else{
            var customerLike=new CustomerLike()
            customerLike.clm_sender_unique_id=req.body.loggedin_unique_id
            customerLike.clm_receiver_unique_id=req.body.user_receiver_unique_id
            customerLike.clm_super_like_msg=req.body.user_super_like_msg
            var result=await customerLike.save()
            result.clm_id=result._id
            result.clm_like_time=new Date()
            await result.save();
            return res.status(200).json({
                status:1,
                message:"User liked Successfully",
                return:[]
        
            })
        }
   

    }catch(err){
        return res.status(500).json({
            status:0,
            message:err.message
        })
    }
}

