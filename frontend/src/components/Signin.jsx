import {Card} from './Card'
import {Input} from './Input'
import {DisplayError} from './DisplayError'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
export function Signin(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [incorrect,setIncorrect]=useState("");
    const navigate=useNavigate();
    async function signinhandler(){
        let response=await fetch("http://localhost:3000/api/v1/user/signin",{
            method:"POST",
            body:JSON.stringify({
                "username":email,
                "password":password
            }),
            headers:{
                "content-type":"application/json"
            }
        })
        let result=await response.json();
        if (response.status==200){
            localStorage.setItem('token',"Bearer "+result["token"]);
            navigate("/dashboard");
        }
        setIncorrect(result["message"]);
    }
    return (
     <div className="w-screen h-screen flex bg-grey justify-center items-center">
        <Card heading={"Sign In"} subheading={"Enter your credentials to access your account"}  warning={"Don't have an account?"} warningnavigate={"/signup"} >
            <Input  heading={"Email"} type={"text"} holder={"johndoe@example.com"} setter={setEmail}></Input>
            <Input  heading={"Password"} type={"password"} holder={""} setter={setPassword}></Input>
            <button onClick={signinhandler} className="bg-black text-white w-full h-8">Signin</button> 
            <DisplayError message={incorrect}></DisplayError>
        </Card>
     </div>
    )

}
