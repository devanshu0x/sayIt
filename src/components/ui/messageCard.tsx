"use client";
import {format} from "date-fns"
import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { toast } from "sonner";
import { Message } from "@/model/user";


interface MessageCardProps{
    message:Message;
    removeMessage:(messageId:string)=>void;
}
export const MessageCard=({message,removeMessage}:MessageCardProps)=>{
    async function deleteMessage(){
        try{
            const res=await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
            toast.success(res.data.message)
            removeMessage(message._id.toString());
        }catch(err){
            const axiosErr= err as AxiosError<ApiResponse>;
            toast.error(axiosErr.response?.data.message ?? "Failed to delete message")
        }
    }
    return <div className="max-w-sm bg-card shadow p-4 rounded-lg max-h-50 overflow-y-scroll no-scrollbar">
        <div className="text-muted-foreground flex justify-between pb-2">{format(message.createdAt,"do LLL y, H:mm")}
            <AlertDialog >
                <AlertDialogTrigger asChild>
                    <Trash2 className="h-5 text-red-400 hover:text-red-600 transition-colors duration-300"/>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this message</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete the message</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteMessage} >Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        <p>{message.content}</p>
    </div>
}