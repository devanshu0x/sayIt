"use client";

import { useEffect, useState } from "react";
import { Textarea } from "./textarea";
import { Label } from "./label";
import { Button } from "./button";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { Dialog, DialogContent } from "./dialog";
import { Loader2 } from "lucide-react";

interface SendMessageProps {
    username: string
}

export function SendMessage({ username }: SendMessageProps) {
    const [message, setMessage] = useState<string>("");
    const [isProofreading, setIsProofreading] = useState<boolean>(false);
    const [suggestedMessage,setSuggestedMessage]=useState<string[]>([]);
    const [isSuggesting,setIsSuggesting]=useState<boolean>(false);


    async function submitMessage() {
        if (message.length > 500) {
            toast.error("Message length should not me more than 500 characters")
            return;
        }

        try {
            const res = await axios.post<ApiResponse>("/api/send-message", {
                username,
                content: message
            });
            toast.success(res.data.message);
            setMessage("");
        } catch (err) {
            const axiosError = err as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message || "Failed to send message")
        }
    }


    async function proofReadMessage() {
        if (message.length > 500) {
            toast.error("Message length too long")
            return;
        }
        setIsProofreading(true);
        try {
            const res = await axios.post<ApiResponse>("/api/proofread-message", {
                message: message
            })
            if (res.data.output) {
                setMessage(res.data.output);
            }
            toast.success(res.data.message);

        } catch (err) {
            const axiosErr = err as AxiosError<ApiResponse>;
            toast.error(axiosErr.response?.data.message ?? "Failed to proofread it");
        }
        finally {
            setIsProofreading(false);
        }
    }

    async function suggestMessages(){
        setIsSuggesting(true);
        try{
            const res= await axios.get<ApiResponse>("/api/suggest-message");
            if(res.data.output){
                setSuggestedMessage(res.data.output.split("||"));
            }
            toast.success(res.data.message)
        }catch(err){
            const axiosErr = err as AxiosError<ApiResponse>;
            toast.error(axiosErr.response?.data.message ?? "Failed to suggest message");
        }finally{
            setIsSuggesting(false);
        }
    }

    useEffect(()=>{
        suggestMessages();
    },[])

    return (
        <div className="mt-8">
            <Label className="my-2 flex justify-between items-center text-lg">Send Message to {username}
                <span>Character count:({message.length}/500)</span>
            </Label>
            <Textarea disabled={isProofreading} placeholder="Write your message Here(Max 500 characters)" value={message} onChange={(e) => setMessage(e.target.value)} className="text-lg md:text-lg min-h-50 mb-4" />
            <div className="flex justify-end gap-2">
                <Button onClick={suggestMessages} disabled={isSuggesting} variant={"outline"}>{
                    isSuggesting? <Loader2 className="animate-spin" />  : "Suggest Messages"
                    }</Button>

                <Button onClick={proofReadMessage} variant={"outline"} disabled={isProofreading} >{
                    isProofreading ? <Loader2 className="animate-spin" /> : "Proofread It"
                }</Button>

                <Button onClick={submitMessage} >Send Message</Button>
            </div>
            <div className="py-4 mt-4">
                <h5 className="text-xl sm:text-2xl text-secondary-foreground text-center">Suggested Messages</h5>
                {
                    isSuggesting? <div className="h-20 flex justify-center items-center">
                        <Loader2 className="animate-spin h-8" />
                    </div>
                    :
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                    {suggestedMessage.map((message,ind)=>(
                        <div key={ind} className="bg-card p-4 shadow rounded-lg flex flex-col justify-between gap-2">
                            <div>{message}</div>
                            <Button variant={"secondary"} onClick={()=>setMessage(message)} >Use this message</Button>
                        </div>
                    ))}
                </div>
                }
            </div>
        </div>
    )
}