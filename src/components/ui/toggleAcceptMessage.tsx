"use client"

import { useEffect, useState } from "react"
import { Switch } from "./switch"
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { toast } from "sonner";

export function ToggleAcceptMessage(){

    const [isSwitchLoading,setIsSwitchLoading]=useState<boolean>(false);
    const [isAcceptingMessage,setIsAcceptingMessage]=useState<boolean>(false);

    const fetchAcceptMessage=async ()=>{
        setIsSwitchLoading(true);
        try{
            const res=await axios.get<ApiResponse>("/api/accept-messages");
            setIsAcceptingMessage(res.data.isAcceptingMessage ?? false)
        }catch(err){
            const axiosError= err as AxiosError<ApiResponse>;
            const errorMsg= axiosError.response?.data.messages || "Some error occured"
            toast.error("Error: "+errorMsg);
        }
        finally{
            setIsSwitchLoading(false);
        }
    };

    const handleSwitchChange=async ()=>{
        try{
            const response=await axios.post<ApiResponse>("/api/accept-messages",{
                isAcceptingMessage:!isAcceptingMessage
            })
            setIsAcceptingMessage((val)=>!val);
            toast.success(response.data.message)
        }catch(err){
            const axiosError= err as AxiosError<ApiResponse>;
            const errorMsg= axiosError.response?.data.messages || "Some error occured"
            toast.error("Error: "+errorMsg);
        }
    }

    useEffect(()=>{
        fetchAcceptMessage();
    },[])
    
    return (
        <div className="flex items-center space-x-2">
                <Switch
                checked={isAcceptingMessage}
                onCheckedChange={handleSwitchChange}
                disabled={isSwitchLoading}
              />
              
              <p>Accept Messages: { isAcceptingMessage? "On":"Off"}</p>
        </div>
    )
}