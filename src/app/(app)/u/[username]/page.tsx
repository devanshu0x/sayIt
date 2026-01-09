import { SendMessage } from "@/components/ui/sendMessage";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

interface SendMessageParams{
    params:Promise<{
        username:string;
    }>
}

async function checkUserExists(username:string){
    await dbConnect()
    try{
        const user= await UserModel.findOne({
            username,
            isVerified:true
        })
        if(user) return true;
        return false;
    }catch(err){
        console.log(err)
        return false;
    }
}


export default async function SendMessagePage({params}:SendMessageParams){
    const username= (await params).username;
    const userExists= await checkUserExists(username);
    if(!userExists){
        return <main className="flex justify-center items-center h-60">
            <h1 className="text-2xl sm:text-4xl">No such user exists</h1>
        </main>
    }

    return <main className="px-2 py-8 sm:px-6 sm:py-10 md:px-14 md:py-12 ">
        <h4 className="text-primary text-xl sm:text-2xl md:text-3xl text-center">Send Message</h4>
        <SendMessage username={username} />
    </main>
}