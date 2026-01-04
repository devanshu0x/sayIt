"use client";

import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {z} from "zod"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/apiResponse";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VerifyPage(){
    const router=useRouter();
    const {username}= useParams<{username:string}>();
    const [isSubmitting,setIsSubmitting]=useState<boolean>(false);
    const searchParams= useSearchParams();
    const code=searchParams.get("code") ?? "";
    const form= useForm<z.infer<typeof verifySchema>>({
        resolver:zodResolver(verifySchema),
        defaultValues:{
            code:code,
            username:username
        }
    })

    async function onSubmit(data: z.infer<typeof verifySchema>){
        setIsSubmitting(true);
        try{
            const response=await axios.post<ApiResponse>("/api/verify-code",data);
            toast.success(response.data.message)
            router.push("/dashboard")

        }catch(err){
            console.log("Error occured while verifying ",err);
            const axiosErr= err as AxiosError<ApiResponse>;
            toast.error(axiosErr.response?.data.message ?? "Error in verifying")

        }
        finally{
            setIsSubmitting(false);
        }
    }

    return <main className="min-h-screen flex items-center justify-center bg-primary">
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle className="text-center text-primary text-2xl">Verify Account</CardTitle>
                <CardDescription className="text-center">Enter otp sent on your email to verify</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="verify-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="username"
                            control={form.control}
                            render={({field,fieldState})=>(
                                <Field data-invalid={fieldState.invalid} >
                                    <FieldLabel>Username</FieldLabel>
                                    <Input {...field} disabled={true} />
                                    {
                                    fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )
                                    }
                                </Field>
                            )}
                        />
                        <Controller
                            name="code"
                            control={form.control}
                            render={({field,fieldState})=>(
                                <Field data-invalid={fieldState.invalid} >
                                    <FieldLabel>Otp</FieldLabel>
                                    <Input {...field}/>
                                    {
                                    fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )
                                    }
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation={"vertical"}>
                            <Button disabled={isSubmitting} type="submit" form="verify-form" className="w-full">Verify Account</Button>
                            <Button onClick={()=>router.push("/sign-up")} variant={"secondary"} className="w-full">Try signing up again</Button>
                </Field>
            </CardFooter>

        </Card>
    </main>
}