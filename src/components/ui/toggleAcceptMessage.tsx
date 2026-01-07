"use client"

import { useState } from "react"
import { Switch } from "./switch"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMeassageSchema } from "@/schemas/acceptMessageSchema";
import z from "zod";

interface ToggleAcceptMessageProps{
    isAcceptingMessage:boolean;
}

export function ToggleAcceptMessage({isAcceptingMessage}:ToggleAcceptMessageProps){
    const form= useForm<z.infer<typeof acceptMeassageSchema>>({
        resolver:zodResolver(acceptMeassageSchema),
        defaultValues:{
            isAcceptingMessage:
        }
        
    })
    return (
        <div className="flex items-center space-x-2">
              <Switch  checked={enabled} onCheckedChange={setEnabled} />
              <p>Accept Messages: { enabled? "On":"Off"}</p>
        </div>
    )
}