const CustomerReject = require("../model/customerReject");

exports.customerReject=async(req,res)=>{
    try{
        var rejectExist=await CustomerReject.findOne({crm_sender_unique_id:req.body.loggedin_unique_id,crm_receiver_unique_id:req.body.crm_receiver_unique_id})
        if(rejectExist){
            rejectExist.crm_reject_time=new Date()
            await rejectExist.save()
            return res.status(200).json({
                status:1,
                message:"User Already Rejected"
            })
        }else{

            var customerReject=new CustomerReject()
            customerReject.crm_sender_unique_id=req.body.loggedin_unique_id
            customerReject.crm_receiver_unique_id=req.body.crm_receiver_unique_id
            var result=await customerReject.save()
            result.crm_id=result._id
            await result.save();
            return res.status(200).json({
                status:1,
                message:"User Reject Successfully",
                return:[]
        
            })
        }
    }catch(err){
        return res.status(200).json({
            status:0,
            message:err.message
        })
    }
}


exports.customerRewindReject=async(req,res)=>{
    try{
        var rejectExist=await CustomerReject.findOne({crm_sender_unique_id:req.body.loggedin_unique_id,crm_receiver_unique_id:req.body.crm_receiver_unique_id})
        if(rejectExist){
            
            await CustomerReject.remove({crm_sender_unique_id:req.body.loggedin_unique_id,crm_receiver_unique_id:req.body.crm_receiver_unique_id})
            return res.status(200).json({
                status:1,
                message:"User Remove Rejected Successfully"
            })
        }else{
            return res.status(200).json({
                status:0,
                message:"No Data Found"
        
            })
        }
    }catch(err){
        return res.status(200).json({
            status:0,
            message:err.message
        })
    }
}