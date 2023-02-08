const CustomerMT=require('../model/microTransaction')



exports.addSuperLike=async(req,res)=>{
    try{
       var customerMt=await CustomerMT.findOne({cmm_c_unique_id:req.body.unique_id})
       if(customerMt){
        
        if(req.body.super_like!=""){
            if(customerMt.cmm_super_like!=""){
                var sum=parseInt(customerMt.cmm_super_like)+parseInt(req.body.super_like)
                customerMt.cmm_super_like=sum.toString()
                 
            }else{
                customerMt.cmm_super_like=req.body.super_like
            }
        
       }
       if(req.body.super_like_for_trn_id){
        customerMt.cmm_super_like_for_trn_id=req.body.super_like_for_trn_id
       }
       await customerMt.save()
       return res.status(200).json({
        status:1,
        message:"Data added successfully"
       })
    }else{
        var customerMt=new CustomerMT()
        customerMt.cmm_c_unique_id=req.body.unique_id
        if(req.body.super_like!=""){
            
                console.log("hi")
                customerMt.cmm_super_like=req.body.super_like
            
        
       }
           if(req.body.super_like_for_trn_id){
            customerMt.cmm_super_like_for_trn_id=req.body.super_like_for_trn_id
           }
           await customerMt.save()
           return res.status(200).json({
            status:1,
            message:"Data added successfully"
           })
    }
    }catch(err){
        return res.status(500).json({
            status:0,
            message:err.message
        })
    }
}

exports.addLike=async(req,res)=>{
    try{
       var customerMt=await CustomerMT.findOne({cmm_c_unique_id:req.body.unique_id})
       if(customerMt){
        
        if(req.body.super_like!=""){
            if(customerMt.like&&customerMt.like!=""){
                var sum=parseInt(customerMt.cmm_like)+parseInt(req.body.like)
                customerMt.cmm_like=sum.toString()
                 
            }else{
                customerMt.cmm_like=req.body.like
            }
        
       }
       if(req.body.like_for_trn_id){
        customerMt.cmm_like_for_trn_id=req.body.like_for_trn_id
       }
       await customerMt.save()
       return res.status(200).json({
        status:1,
        message:"Data added successfully"
       })
    }else{
        var customerMt=new CustomerMT()
        customerMt.cmm_c_unique_id=req.body.unique_id
        if(req.body.like!=""){
            
                
                customerMt.cmm_like=req.body.like
            
        
       }
           if(req.body.like_for_trn_id){
            customerMt.cmm_like_for_trn_id=req.body.like_for_trn_id
           }
           await customerMt.save()
           return res.status(200).json({
            status:1,
            message:"Data added successfully"
           })
    }
    }catch(err){
        return res.status(500).json({
            status:0,
            message:err.message
        })
    }
}

exports.fetchMt=async(req,res)=>{
    try{
       var mtData=await CustomerMT.findOne({cmm_c_unique_id:req.body.unique_id})
       if(mtData){
        return res.status(200).json({
            status:1,
            message:"MT data fetched successfelly",
            data:mtData
        })
       }else{
        return res.status(200).json({
            status:0,
            message:"MT data not found"
        })
       }
    }catch(err){
        return res.status(500).json({
            status:0,
            message:err.message
        })
    }
}