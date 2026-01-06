import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { UserLink } from "@/components/ui/userLink";
import { Clipboard, ClipboardCopy } from "lucide-react";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function Dashboard(){
  const session= await getServerSession(authOptions);
  if(!session || !session.user){
    redirect("/sign-in");
  }
  const user=session.user;
  return (
    <main className="px-2 py-8 sm:px-6 sm:py-10 md:px-14 md:py-12 ">
      
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold text-primary">User Dashboard</h3>
          <h4 className="text-lg sm:text-xl md:text-2xl pt-2">Welcome {user.username}!</h4>
          <div className="space-y-2 mt-4">
            <p className="">Copy Your unique url</p>
            <UserLink username={user.username ?? "User"} />
          </div>
     
    </main>
  )
}