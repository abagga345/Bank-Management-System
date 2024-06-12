const mongoose=require("mongoose");
const { MONGO_URL } = require("./config");
mongoose.connect(MONGO_URL);
const userschema=mongoose.Schema({
    firstName:{type:String,required:true,maxLength:50},
    lastName:{type:String,required:true,maxLength:50},
    username:{type:String,unique:true,required:true,minLength:3,maxLength:50},
    password:{type:String,required:true,minLength:3,maxLength:20}
})

const accountschema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    balance:{type:Number,required:true}
})


const User=mongoose.model("User",userschema);
const Account=mongoose.model("Account",accountschema);
module.exports={"User":User,"Account":Account};
