import { useMemo,useState,useEffect } from "react";
import {User} from './User'
import {Navbar} from './Navbar'

export function Dashboard(){
    const [balance,setBalance]=useState("");
    const [username,setUsername]=useState("");
    
    useEffect(()=>{
        let token=localStorage.getItem("token");
        
        fetch("http://localhost:3000/api/v1/account/balance",{
            headers:{
                "authorization":token
            }
        }).then(async (response)=>{
            
            let result=await response.json();
            setBalance(result["balance"]);
            setUsername(result["username"]);
        })
    },[])
    return (
        <div className="p-6 w-11/12">
            <Navbar username={username}></Navbar>
            <div className="flex gap-5 mt-3">
                <div>Your Balance</div>
                <div>${balance}</div>
            </div>
            <User></User>
        </div>
    )
}