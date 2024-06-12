import {useNavigate} from 'react-router-dom'
import {memo} from 'react';
export let Card=memo(function({heading,subheading,warning,warningnavigate,children}){
    const navigate=useNavigate();
    function handler(event){
        event.preventDefault(); //to prevent default behaviour of going to href
        navigate(warningnavigate);
    }
    return (
        <div className="rounded-lg h-fit  w-fit bg-white flex flex-col items-center justify-between p-5 gap-5">
            <h1 className="font-bold text-3xl">{heading}</h1>
            <div>{subheading}</div>
            {children}
            <div className="flex gap-1" >
                <div>{warning}</div>
                <a className="decoration-1 underline" href="" onClick={handler}>{warningnavigate.substr(1)}</a>
            </div>
        </div>
    )
})