"use client";
import { Controller, useForm } from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/apiResponse";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/schemas/signInSchema";

export default function SignUpPage() {
 
  const [isSubmitting, setIsSubmitting]=useState<boolean>(false);
  const router=useRouter();
  const form= useForm<z.infer<typeof signInSchema>>(
    {
      resolver: zodResolver(signInSchema),
      defaultValues:{
        identifier:"",
        password:""
      }
    }
  );

  async function onSubmit(data: z.infer<typeof signInSchema>){
    setIsSubmitting(true);
    try{
      const response=await axios.post<ApiResponse>("/api/sign-in",data);
      toast.success(response.data.message);
      router.replace(`/dashboard`)
    }catch(err){
      console.error("Error in signing in ",err);
      const axiosError= err as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message ?? "Error is signing in");
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary">
      
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-primary text-2xl">
              Sign In
            </CardTitle>
            <CardDescription className="text-center">
              Sign in with your details to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                  name="identifier"
                  control={form.control}
                  render={({field,fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Username/Email</FieldLabel>
                      <Input
                      {...field}
                      placeholder="Enter your username or email address"
                      type="text"
                      />
                      {
                        fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )
                      }
                    </Field>
                  )}
                  />
                  <Controller
                  name="password"
                  control={form.control}
                  render={({field,fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Password</FieldLabel>
                      <Input
                      {...field}
                      placeholder="Enter your password"
                      type="password"
                      />
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
          <CardFooter className="flex flex-col gap-4">
            <Field orientation={"horizontal"} className="">
                  <Button type="button" variant={"outline"} onClick={()=>form.reset()} >Reset</Button>
                  <Button disabled={isSubmitting} type="submit" form="sign-in-form" >Submit</Button>
            </Field>
            
              <div className="flex flex-row justify-center items-center">
                <span className="text-sm">New User?</span>
              <Button variant={"link"} onClick={()=>router.push("/sign-up")}>Sign up</Button>
              </div>
            
          </CardFooter>
        </Card>
     
    </main>
  )
}
