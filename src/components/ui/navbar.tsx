"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import { signOut, useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { GithubIcon, Menu, MessageCircle } from "lucide-react";


export const Navbar= ()=>{
    const router=useRouter();
    const session=useSession();
    let isLoggedIn=false;
    if(session && session.data?.user){
        isLoggedIn=true;
    }
    return <div className="bg-accent/30 fixed top-0 left-0 right-0 z-10 backdrop-blur-md px-4 sm:px-6 py-2 border-b border-border">
        <nav className="flex justify-between items-center bg-transparent">
        <span className="text-2xl font-extrabold text-primary tracking-wide">SAY<span className="text-secondary">IT</span></span>
        <div className="hidden sm:flex items-center gap-4">
            <a href="https://github.com/devanshu0x" target="_blank"><img src="/github.svg" className="h-9 hover:cursor-pointer" /></a>
            <Button variant={"outline"}>Send Message</Button>
            {
                isLoggedIn? (<Button variant={"destructive"} onClick={async ()=> await signOut()}>Sign out</Button>):(<Button onClick={()=>router.push("/sign-in")} >Sign In</Button>)
            }
        </div>
        <div className="sm:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}><Menu/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-46 mt-2 mr-1 border-border" align="start">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            {
                isLoggedIn? (<Button variant={"link"} className="w-full" onClick={async ()=> await signOut()}>Sign out</Button>):(<Button variant={"link"} className="w-full" onClick={()=>router.push("/sign-in")} >Sign In</Button>)
            }
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <MessageCircle/>
                            Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           <GithubIcon/> Check out our github
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </nav>
    </div>
}