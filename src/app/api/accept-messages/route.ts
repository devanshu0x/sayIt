import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/user";
import { acceptMeassageSchema } from "@/schemas/acceptMessageSchema";


export async function POST(req:Request){
    try{
        await dbConnect();
        const session= await getServerSession(authOptions);
        const user= session?.user;
        if(!session || !user){
            return Response.json({
                success:false,
                message:"Not authenticated"
            },{status:401})
        }
        const userId= user._id;
        const {isAcceptingMessage}= await req.json();

        const result= acceptMeassageSchema.safeParse(isAcceptingMessage);
        if(!result.success){
            const err= result.error.format()._errors || [];
            return Response.json({
                success:false,
                message: err.length>0? err.join(", ") : "failed to validate input"

            },{status:400})
        }

        const userInDb=await UserModel.findOne({
            _id:userId
        });

        if(!userInDb){
            return Response.json({
                success:false,
                message:"User not found in db"
            },{status:400})
        }

        userInDb.isAcceptingMessage=isAcceptingMessage;
        await userInDb.save();
        
        return Response.json({
            success:true,
            message:"accept message status updated"
        })
        
    }catch(err){
        console.log("Error in sending message ",err);
        return Response.json({
            success:false,
            message:'Unable to change user status to accept message'
        })
    }
}


export async function GET(){

    await dbConnect();
        const session= await getServerSession(authOptions);
        const user= session?.user;
        if(!session || !user){
            return Response.json({
                success:false,
                message:"Not authenticated"
            },{status:401})
        }
        const userId= user._id;
        try{
            const userInDb=await UserModel.findOne({
                _id:userId
            });
            if(!userInDb){
                return Response.json({
                    success:false,
                    message:'Unable to find user'
                },{status:400});
            }

            return Response.json({
                success:true,
                message:"successfully fetched status",
                isAcceptingMessage:userInDb.isAcceptingMessage
            })
        }catch(err){
            console.error("Error while fetching accept message status ",err);
            return Response.json({
                success:false,
                message:"Faield to fetch status"
            },{status:500})
        }

}