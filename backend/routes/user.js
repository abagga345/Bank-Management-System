const express=require("express");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config");
const {User,Account}=require("../db");
const {schema1,schema2,schema3}=require("./inputValidator");
const {authMiddleware}=require("../middleware");
const userRouter=express.Router();

userRouter.post("/signup",async function(req,res){
  

   let result=schema1.safeParse(req.body);
   if (result["success"]==false){
        res.status(411).json({"message":"Email already taken/ Incorrect Inputs"});
        return;
   }
   try{
        let existence=await User.findOne({"username":req.body.username});
        if (existence!=null){
            res.status(411).json({"message":"Email already taken/ Incorrect Inputs"});
            return;
        }
        let insert=await User.create({"username":req.body.username,"password":req.body.password,"firstName":req.body.firstName,"lastName":req.body.lastName});
        let temp=((Math.random()*9999)+1);
        let insert1=await Account.create({"userId":insert["_id"],"balance":temp})
        let token=jwt.sign({"userId":insert["_id"]},JWT_SECRET);
        res.json({"message":"USER CREATED SUCCESSFULLY","token":token});
    }catch(err){
        console.log(err);
        res.status(500).json({"message":"INTERNAL SERVER ERROR"});
   } 
})

userRouter.post("/signin",async function(req,res){
   let result=schema2.safeParse(req.body);
   if (result["success"]==false){
        res.status(411).json({"message":"Error while logging in"});
        return;
   }
    let existence=await User.findOne({"username":req.body.username,"password":req.body.password});
    if (existence==null){
        res.status(411).json({"message":"Email already taken/ Incorrect Inputs"});
        return;
    }
    let token=jwt.sign({"userId":existence["_id"]},JWT_SECRET);
    res.json({"token":token});
})

userRouter.put("/",authMiddleware,async function(req,res){
    let userId=req.userId;
    let inputvalid=schema3.safeParse(req.body);
    if (inputvalid["success"]==false){
        res.status(411).json({"message":"Error while updating information"});
        return;
    }
    try{
        let result=await User.updateOne({"_id":userId},req.body);
        res.json({"message":"Updated successfully"});
    }catch(err){
        console.log(err);
        res.status(411).json({"message":"Error while updating information"});
    }
})

userRouter.get("/bulk",authMiddleware,async function(req,res){
    let filter=req.query.filter;
    let result=await User.find({
        $or:[
            {firstName:{$regex:filter,$options:'i'}}, //case insensitive matching
            {lastName:{$regex:filter,$options:'i'}} //in $regex we provide input as a string without / / as in javascript
        ]
    })
    let finalarr=[];
    for(let i=0;i<result.length;i++){
        if (result[i]["_id"]==req.userId) continue;
        let obj={"firstName":result[i].firstName,"lastName":result[i].lastName,"_id":result[i]["_id"]};
        finalarr.push(obj);
    }
    res.json({"users":finalarr});
})



module.exports={"userRouter":userRouter};