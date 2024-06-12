import {useNavigate} from 'react-router-dom'
export function Sendbutton({userId,firstName,lastName}){
    const navigate=useNavigate();
    function sendhandler(){
        navigate(`/send?userId=${userId}&firstName=${firstName}&lastName=${lastName}`);
    }
    return (
        <>
            <button className="bg-black text-white  w-1/4" onClick={sendhandler}>Send Money</button>
        </>
    )
}