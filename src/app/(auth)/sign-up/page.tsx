"use client";
import { signUpSchema } from "@/schemas/signUpSchema";
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

function Page() {
 
  const [usernamMessage,setUsernameMessage]=useState<string>("");
  const [isCheckingUsername,setIsCheckingUsername]= useState<boolean>(false);
  const [isSubmitting, setIsSubmitting]=useState<boolean>(false);
  const [isUsernameUnique,setIsUsernameUnique]= useState<boolean>(false);
  const router=useRouter();
  const form= useForm<z.infer<typeof signUpSchema>>(
    {
      resolver: zodResolver(signUpSchema),
      defaultValues:{
        username:"",
        email:"",
        password:""
      }
    }
  );

  const username= form.watch("username");

  const debouncedUsername=useDebounce(username,400);
  useEffect(()=>{
    async function checkUsernameValidity(){
        if(debouncedUsername){
          setIsCheckingUsername(true);
          setUsernameMessage("");
          try{
            const res=await axios.get(`/api/check-username-unique?username=${debouncedUsername}`);
            setUsernameMessage(res.data.message)
            setIsUsernameUnique(true);
          }catch(err){
            const axiosError= err as AxiosError<ApiResponse>;
            setUsernameMessage(axiosError.response?.data.message ?? "Error checking username")
            setIsUsernameUnique(false);
          }finally{
            setIsCheckingUsername(false);
          }

        }else{
          setUsernameMessage("");
        }
    }

    checkUsernameValidity();
  },[debouncedUsername])

  useEffect(()=>{
    setIsUsernameUnique(false);
    setUsernameMessage("");
  },[username])

  async function onSubmit(data: z.infer<typeof signUpSchema>){
    setIsSubmitting(true);
    try{
      const response=await axios.post<ApiResponse>("/api/sign-up",data);
      toast.success(response.data.message);
      router.replace(`/verify/${data.username}`)
    }catch(err){
      console.error("Error in signing up ",err);
      const axiosError= err as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message ?? "Error is signing up");
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary">
      
        <Card className="w-full sm:max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-primary text-2xl">
              Sign Up
            </CardTitle>
            <CardDescription className="text-center">
              Sign up with your details to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="username"
                    control={form.control}
                    render={
                      ({field,fieldState})=>(
                        <Field data-invalid={fieldState.invalid} >
                          <FieldLabel>
                            Username
                          </FieldLabel>
                          <Input
                          {...field}
                          placeholder="Enter your username"
                          />
                          {
                            fieldState.invalid ? (
                              <FieldError errors={[fieldState.error]} />
                            ): (!isCheckingUsername && usernamMessage!=="")&& (
                              <span className={(isUsernameUnique? "text-green-400 text-sm": "text-red-400 text-sm")}>{usernamMessage}</span>

                            )
                          }
                        </Field>
                      )
                    }
                  />
                  <Controller
                  name="email"
                  control={form.control}
                  render={({field,fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                      {...field}
                      placeholder="Enter your email address"
                      type="email"
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
                  <Button disabled={isSubmitting || isCheckingUsername || !isUsernameUnique} type="submit" form="sign-up-form" >Submit</Button>
            </Field>
            
              <div className="flex flex-row justify-center items-center">
                <span className="text-sm">Already a member?</span>
              <Button variant={"link"} onClick={()=>router.push("/sign-in")}>Sign In</Button>
              </div>
            
          </CardFooter>
        </Card>
     
    </main>
  )
}

export default Page