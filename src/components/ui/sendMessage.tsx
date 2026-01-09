"use client";

import { useState } from "react";
import { Textarea } from "./textarea";
import { Label } from "./label";
import { Button } from "./button";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";

interface SendMessageProps{
    username:string
}

export function SendMessage({username}:SendMessageProps){
    const [message,setMessage]=useState<string>("");

    async function submitMessage(){
        if(message.length>500){
            toast.error("Message length should not me more than 500 characters")
            return;
        }

        try{
            const res= await axios.post<ApiResponse>("/api/send-message",{
                username,
                content:message
            });
            toast.success(res.data.message);
            setMessage("");
        }catch(err){
            const axiosError= err as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message || "Failed to send message")
        }
    }


    async function proofReadMessage(){
        try{
            const res= await axios.post("/api/proofread-message",{
                message:message
            })
            
        }catch(err){

        }
    }

    return (
        <div className="mt-8">
            <Label className="my-2 flex justify-between items-center text-lg">Send Message to {username}
                <span>Character count:({message.length}/500)</span>
            </Label>
            <Textarea placeholder="Write your message Here(Max 500 characters)" value={message} onChange={(e)=>setMessage(e.target.value)} className="text-lg md:text-lg min-h-50 mb-4" />
            <div className="flex justify-end gap-2">
                <Button variant={"secondary"}>Proofread It</Button>
                <Button onClick={submitMessage} >Send Message</Button>
            </div>
        </div>
    )
}