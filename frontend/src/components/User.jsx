import {Sendbutton} from './Sendbutton'
import {useState,useEffect} from 'react'

export function User(){
    const [filter,setFilter]=useState("");
    const [persons,setPersons]=useState([]);
    let id=-1;
    useEffect(()=>{
        let token=localStorage.getItem("token");
        
        fetch(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers:{
                "authorization":token
            }
        }).then(async (response)=>{
            let result=await response.json();
            setPersons(result["users"]);
        })
    },[filter])

    function onchangehandler(e){
        if (id!=-1){
            clearTimeout(id);
        }
        id=setTimeout(()=>{
            setFilter(e.target.value);
        },500)
    }

    return (
        <div className="w-1/2 flex flex-col gap-4 mt-3.5">
            <h3 className="text-xl font-bold">Users</h3>
            <input className="border border-solid border-black" type="text" onChange={onchangehandler} placeholder="Search users.."></input>
            {persons.map((user)=>{
                return (
                    <Helper user={user} key={user["_id"]}></Helper>
                )
            })}
        </div>
    )

}

function Helper({user}){
    return (
    <div className="flex justify-between">
        <div>{user.firstName+" "+ user.lastName}</div>
        <Sendbutton userId={user["_id"]} firstName={user["firstName"]} lastName={user["lastName"]}>Send money</Sendbutton>
    </div>
    )
}