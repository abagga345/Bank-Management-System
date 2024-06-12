import {useNavigate} from 'react-router-dom';

export function Navbar({username}){
   const navigate=useNavigate();
    function logouthandler(){
        localStorage.clear();
        navigate("/signin");
    }
    return (
        <div>
            <hr></hr>
            <div className="flex jusrify-between">
                <div className="flex justify-between w-11/12 p-2" >
                    <h2 className="font-bold text-2xl">Payments App</h2>
                    <div>Hello,{username}</div>
                </div>
                <div className="w-1/12 flex flex-col justify-center">
                    <button onClick={logouthandler} className="bg-black text-white">Logout</button>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}