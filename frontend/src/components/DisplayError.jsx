import {memo} from 'react'
export let DisplayError= memo(function({message}){
    if (message==""){
        return <></>
    }
    return (
        <>
            <div className="text-red-500 font-bold">{message}</div>
        </>
    )
})
