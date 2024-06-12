const express=require("express");
const cors=require("cors");
const {mainRouter}=require("../backend/routes/index")

const app=express();

app.listen(3000,function(){
    console.log("SERVER LISTENING ON PORT 3000");
})
app.use(cors());
app.use(express.json());

app.use("/api/v1",mainRouter);
