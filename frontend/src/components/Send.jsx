import { useState } from "react";
import { Transfer } from "./Transfer";
export function Send(){
    return (
        <div className="w-screen h-screen flex bg-grey justify-center items-center">
            <div className="shadow-md rounded-lg h-2/5  w-5/12 bg-white flex flex-col items-center gap-5 p-4">
                <div className="font-bold text-3xl">Send Money</div>
                 <Transfer></Transfer>
            </div>
        </div>
    )
}