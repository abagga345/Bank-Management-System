import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { DisplayError } from "./DisplayError";
export function Transfer(){
    const [searchParams]=useSearchParams();
    let userId=searchParams.get("userId");
    let first=searchParams.get("firstName");
    let last=searchParams.get("lastName");
    const [amount,setAmount]=useState(0);
    const [warning,setWarning]=useState("");
    const navigate=useNavigate();

    let id=-1;
    function amounthandler(e){
        if (id!=-1) clearTimeout(id);
        id=setTimeout(()=>{
            setAmount(parseInt(e.target.value));
        },500)
    }
    async function transferhandler(){
        let response=await fetch("http://localhost:3000/api/v1/account/transfer",{
            method:"POST",
            body:JSON.stringify({
                "to":userId,
                "amount":parseInt(amount)
            }),
            headers:{
                "authorization":localStorage.getItem("token"),
                "content-type":"application/json"
            }
        })
        let result=await response.json();
        setWarning(result["message"]);
    }

    function dashboardhandler(){
        navigate("/dashboard");
    }

    return (
        <div className="flex flex-col items-start w-full h-full justify-around">
            <div className="text-xl font-semibold">To {first+" "+last}</div>
            <div className="text-md">Amount (in $)</div>
            <input className="border  border-black w-full"  type="number" onChange={amounthandler} placeholder="Enter amount"></input>
            <div className="flex  w-full justify-center gap-5">
                <button className="bg-green rounded-md text-white  w-1/4 h-full" onClick={transferhandler}>Initiate Transfer</button>
                <button className="bg-green rounded-md text-white  w-1/12 h-full " onClick={dashboardhandler}>Back</button>
            </div>
            <DisplayError message={warning}></DisplayError>
        </div>
    )
}