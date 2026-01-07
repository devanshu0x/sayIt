import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { Switch } from "@/components/ui/switch";
import { ToggleAcceptMessage } from "@/components/ui/toggleAcceptMessage";
import { UserLink } from "@/components/ui/userLink";
import { ApiResponse } from "@/types/apiResponse";
import axios, { AxiosError } from "axios";
import { Clipboard, ClipboardCopy } from "lucide-react";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";


async function checkUserAcceptingMessages(){
  try{
    const res= await axios.get("/accept-messages")
  }
  catch(err){
    const axiosError= err as AxiosError<ApiResponse>;
    return axiosError.
  }
}


export default async function Dashboard(){
  const session= await getServerSession(authOptions);
  if(!session || !session.user){
    redirect("/sign-in");
  }
  const user=session.user;
  
  return (
    <main className="px-2 py-8 sm:px-6 sm:py-10 md:px-14 md:py-12 ">
      
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold text-primary">User Dashboard</h3>
          <h4 className="text-lg sm:text-xl md:text-2xl pt-2 underline">Welcome {user.username}!</h4>
          <div className="space-y-2 mt-4">
            <p className="text-muted-foreground">Copy your unique URL</p>
            <UserLink username={user.username ?? "User"} />
          </div>
          <div className="pt-4">
            <ToggleAcceptMessage isAcceptingMessage={user.isAcceptingMessage!} />
          </div>
          <div className="pt-3">
            <h2 className="text-primary text-center text-xl sm:text-2xl md:text-3xl">Messages</h2>
          </div>
     
    </main>
  )
}