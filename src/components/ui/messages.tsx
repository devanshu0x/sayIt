"use client";

import { Message } from "@/model/user";
import { ApiResponse } from "@/types/apiResponse";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Loader2, RefreshCcw } from "lucide-react";


export function Messages(){
    const [messages,setMessages]=useState<Message[]>([]);
    const [loadingMessage,setLoadingMessage]=useState<boolean>(false);
    const fetchMessages= async ()=>{
        setLoadingMessage(true)
        try{
            const res= await axios.get<ApiResponse>("/api/get-messages");
            setMessages(res.data.messages ?? []);
        }catch(err){
            toast.error("Failed to fetch messages");
        }
        finally{
            setLoadingMessage(false);
        }
    }

    useEffect(()=>{
        fetchMessages();
    },[])
    return (
        <section id="#messages">
            <div>
                <Button onClick={async ()=> await fetchMessages()}>
                    {
                        loadingMessage? <Loader2 className="animate-spin h-4 w-4" />: <RefreshCcw className="h-4 w-4"/>
                    }
                </Button>
            </div>
        </section>
    )
}