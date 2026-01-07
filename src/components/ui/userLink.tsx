"use client";

import { Copy } from "lucide-react"
import { useEffect, useState } from "react";
import { toast } from "sonner";


interface UserLinkProps{
    username:string
}

export const UserLink=({username}:UserLinkProps)=>{
    const copyUrl= async ()=>{
        try{
            await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/u/${username}`);
            toast.success("Copied to clipboard")
        }catch(err){
            toast.error("Failed to copy to clipboard")
        }
    }

    return (
        <div className="bg-secondary text-secondary-foreground px-2 py-2 flex items-center justify-between rounded-lg">
            <span className="wrap-anywhere min-w-0">{`${process.env.NEXT_PUBLIC_APP_URL}/u/${username}`}</span>
            <span onClick={copyUrl} className="bg-secondary text-secondary-foreground"><Copy/></span>
        </div>
    )
}