const express=require("express");
const mongoose= require("mongoose");
const {User,Account}=require("../db");
const {authMiddleware}=require("../middleware");
const accountRouter=express.Router();

accountRouter.get("/balance",authMiddleware,async function(req,res){
    let userId=req.userId;
    try{
        let response2=await Account.findOne({"userId":userId});
        let response3=await User.findOne({"_id":userId});
        res.json({"balance":response2["balance"],"username":response3["username"]});

    }catch(err){
        console.log(err);
        res.status(500).json({"message":"SOMETHING UP WITH THE SERVER"});
    }
})

accountRouter.post("/transfer",authMiddleware,async function(req,res){
    try{
        const session=await mongoose.startSession();
        session.startTransaction();
        const to=req.body.to;
        const amount=req.body.amount;
        const id=req.userId;
        let balancecheker=await Account.findOne({"userId":id}).session(session);
        if (balancecheker["balance"]<amount){
        await  session.abortTransaction();
        res.status(400).json({"message":"INSUFFICIENT BALANCE"});
        }
        let toid=await User.findOne({"_id":to}).session(session);
        if (toid==null){
        await session.abortTransaction();
        res.status(400).json({"message":"INVALID ACCOUNT"});
        }
        await Account.updateOne({"userId":id},{$inc:{"balance":-amount}}).session(session);
        await Account.updateOne({"userId":toid},{$inc:{"balance":amount}}).session(session);
        await session.commitTransaction();
        res.json({"message":"Transfer successful"});
        await session.endSession();
    }catch(err){
        console.log(err);
        res.status(500).json({"message":"INTERNAL SERVER ERROR"});
    }
})


module.exports={"accountRouter":accountRouter};