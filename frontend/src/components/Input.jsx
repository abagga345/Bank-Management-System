import {memo} from 'react'
let id=-1;
export let Input= memo(function ({heading,type,holder,setter}){
    
    function handler(event){
        if (id!=-1) clearTimeout(id);
        id=setTimeout(()=>{
            setter(event.target.value);
        },500)
    }
    return (
        <div className="flex flex-col w-full">
            <div className="font-bold">{heading}</div>
            <input onChange={handler} className="border border-slate-300" type={type} placeholder={holder}></input>
        </div>
    )
})