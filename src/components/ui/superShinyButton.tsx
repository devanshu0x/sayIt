"use client"

import { useRouter } from "next/navigation";


interface SuperShinyButtonProps{
    children?:React.ReactNode;
}

export function SuperShinyButton({children}:SuperShinyButtonProps){
    const router=useRouter();
    return <button onClick={()=>router.push("/dashboard")} className="px-10 py-3 bg-indigo-500 hover:bg-indigo-700 text-secondary-foreground shadow-primary/50 shadow-lg hover:cursor-pointer hover:shadow-2xl rounded-lg text-secondary-foreground font-bold transition-all duration-400 ">
        {children}
    </button>
}