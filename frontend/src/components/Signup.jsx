import {Card} from './Card'
import {Input} from './Input'
import {DisplayError} from './DisplayError'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
export function Signup(){
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [incorrect,setIncorrect]=useState("");
    const navigate=useNavigate();

    async function signuphandler(){
        let response=  await fetch("http://localhost:3000/api/v1/user/signup",{
            method:"POST",
            body:JSON.stringify({
                "firstName":firstName,
                "lastName":lastName,
                "username":email,
                "password":password
            }),
            headers:{
                "content-type":"application/json"
            }
        })
        let result1=await response.json();
        if (response.status==200){
            localStorage.setItem('token',"Bearer "+result1["token"]);
            navigate("/dashboard");
            return;
        }
        let result=await response.json();
        setIncorrect(result["message"]);
    }
    return (
     <div className="w-screen h-screen flex bg-grey justify-center items-center">
            <Card heading={"Sign Up"} subheading={"Enter your information to create an account"}  warning={"Already have an account?"} warningnavigate={"/signin"} >
            <Input  heading={"FirstName"} type={"text"} holder={"John"} setter={setFirstName}></Input>
            <Input  heading={"LastName"} type={"text"} holder={"Doe"} setter={setLastName}></Input>
            <Input  heading={"Email"} type={"text"} holder={"johndoe@example.com"} setter={setEmail}></Input>
            <Input  heading={"Password"} type={"password"} holder={""} setter={setPassword}></Input>
            <button onClick={signuphandler} className="bg-black text-white w-full h-8">Signup</button> 
            <DisplayError message={incorrect}></DisplayError>
        </Card>
     </div>
    )

}
