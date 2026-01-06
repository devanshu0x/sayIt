"use client";

import { Copy } from "lucide-react"
import { useEffect, useState } from "react";


interface UserLinkProps{
    username:string
}

export const UserLink=({username}:UserLinkProps)=>{
    const copyUrl= async ()=>{
        
    }

    return (
        <div className="bg-secondary text-secondary-foreground px-2 py-2 flex items-center justify-between rounded-lg">
            <span className="wrap-anywhere min-w-0">{`${process.env.NEXT_PUBLIC_APP_URL}/u/${username}`}</span>
            <span className="bg-secondary text-secondary-foreground"><Copy/></span>
        </div>
    )
}