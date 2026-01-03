import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/user";
import { messageSchema } from "@/schemas/messageSchema";



export async function POST(req:Request){
    const body=await req.json();
    await dbConnect();
    try{
        const result= messageSchema.safeParse(body);
        if(!result.success){
            const err= result.error.format()._errors || [];
            return Response.json({
                success:false,
                message:err.length>0? err.join(", "): "Invalid input type"
            },{status:400})
        }
        const {username,content}= result.data;

        const user= await UserModel.findOne({
            username
        });

        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            },{status:400})
        }
        if(!user.isAcceptingMessage){
            return Response.json({
                success:false,
                message:"User is not accepting messages at the moment"
            },{status:403})
        }

        const newMessage={
            content,
            createdAt: new Date()
        }

        user.messages.push(newMessage as Message);
        await user.save();

        return Response.json({
            success:true,
            message:"Message sent successfully"
        })
        
    }catch(err){
        console.error("Failed to send message ",err);
        return Response.json({
            success:false,
            message:"Failed to send message"
        },{status:500})
    }
}