"use client";

import { Message } from "@/model/user";
import { ApiResponse } from "@/types/apiResponse";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Loader2, RefreshCcw } from "lucide-react";
import { MessageCard } from "./messageCard";


export function Messages(){
    const [messages,setMessages]=useState<Message[]>([]);
    const [loadingMessage,setLoadingMessage]=useState<boolean>(false);

    const removeMessage=useCallback((messageId:string)=>{
        setMessages(messages.filter((message)=>message._id.toString()!==messageId))
    },[])

    const fetchMessages= useCallback(async ()=>{
        setLoadingMessage(true)
        try{
            const res= await axios.get<ApiResponse>("/api/get-messages");
            setMessages(res.data.messages ?? []);
            toast.success("Fetched messages successfully")
        }catch(err){
            toast.error("Failed to fetch messages");
        }
        finally{
            setLoadingMessage(false);
        }
    },[setMessages,setLoadingMessage])

    useEffect(()=>{
        fetchMessages();
    },[])
    return (
        <section id="#messages">
            <div className="flex justify-end mb-4">
                <Button onClick={async ()=> await fetchMessages()}>
                    {
                        loadingMessage? <Loader2 className="animate-spin h-4 w-4" />: <RefreshCcw className="h-4 w-4"/>
                    }
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-2">
                    {
                        messages.map((message,ind)=>(
                            <MessageCard key={ind} message={message} removeMessage={removeMessage} />
                        ))
                    }
            </div>
        </section>
    )
}