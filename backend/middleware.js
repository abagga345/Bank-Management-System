const jwt=require("jsonwebtoken");
const {JWT_SECRET} =require("./config");
function authMiddleware(req,res,next){
    
    let headers=req.headers.authorization;
    
    if (headers.startsWith("Bearer")==false){
        res.status(403).json({"message":"NOT AUTHORISED FOR THIS ACTION"});
        return;
    }
    let token=headers.split(" ")[1];

    try{
        let result=jwt.verify(token,JWT_SECRET);
        req.userId=result["userId"];
        next();
    }catch(err){
        
        res.status(403).json({"message":"NOT AUTHORISED FOR THIS ACTION"});
    }
}
module.exports={"authMiddleware":authMiddleware};
