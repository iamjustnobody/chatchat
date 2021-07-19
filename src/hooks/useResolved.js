import {useEffect, useState} from "react";

export const useResolved = (...vals) =>{

    const [resolved,setResolved] = useState(false)

    useEffect(()=>{
        setResolved(vals.every(v=>v!==undefined))
    },[vals,setResolved]) //?setResolved

    console.log('resolved?',resolved)
    return resolved; //true if resolved otherwise false
}