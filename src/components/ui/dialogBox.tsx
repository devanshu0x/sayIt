"use client"

import { useState } from "react"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog"
import { Label } from "./label"
import { Input } from "./input"
import { Button } from "./button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const DialogBox= ({setOpen}:{setOpen:(state:boolean)=>void})=>{
    const [username,setUsername]=useState<string>("");
    const router=useRouter();
    return (
        <DialogContent className="sm:max-w-100">
            <DialogHeader>
                <DialogTitle>Send Message</DialogTitle>
                <DialogDescription>Send Message to users using their username</DialogDescription>
            </DialogHeader>
            <Label>Username</Label>
            <Input spellCheck={false} placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
                <Button onClick={()=>{
                    if(username.length>=2){
                        router.push(`/u/${username}`)
                        setOpen(false);
                        setUsername("");
                    }
                    else{
                        toast.error("Username must be at leat 2 characters long")
                    }
            }}  >Send Message</Button>
            </DialogFooter>
        </DialogContent>
        
    )
}