"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(value:T, duration:number){
    const [debounceValue,setDebounceValue]=useState<T>(value);
    useEffect(()=>{
        const timeoutId=setTimeout(()=>setDebounceValue(value),duration);
        return ()=> clearTimeout(timeoutId);
    },[value,duration]);
    return debounceValue;
}