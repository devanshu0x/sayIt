import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation";

interface AppLayoutProps{
    children:React.ReactNode
}

export default async function AppLayout({children}:AppLayoutProps){
    const session= await getServerSession(authOptions);
    if(!session || !session.user){
        redirect("/sign-in");
    }
    return <>
        {children}
        </>
}