const jwt = require("jsonwebtoken");
var jwtSecret=process.env.SECRET

exports.checkToken = (req,res,next) => {
    let authData = req.headers['authorization'];
    if(authData){
        try{
            let token = authData.split(" ");
            if(token[0] !== "Bearer"){
                let response = {
                    status: 0,
                    message: "pass token with bearer",
                }
                res.status(404).send(response)
            }else{
                let verifyData = jwt.verify(token[1],jwtSecret)
                if(verifyData){
                    let tokenData = {
                        unique_id:verifyData.unique_id
                    }
                    req.authUser = tokenData;
                    next();
                }
                
            }
        }catch(err){
            let response = {
                status: "ERROR",
                errors: err.message,
            }
            res.status(403).send(response)
        }
       
    }else{
        let response = {
            status: "ERROR",
            errors: "Access Denied! unauthorized user",
        }
        res.status(401).send(response);
        
    }
   
}