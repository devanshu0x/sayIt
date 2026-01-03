import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { success } from "zod";
import UserModel from "@/model/user";
import mongoose from "mongoose";


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
        const userId= new mongoose.Types.ObjectId(user._id);
        try{
            const userInDb= await UserModel.aggregate([
                {$match: {_id:userId}},
                {$unwind: "$messages"},
                {$sort: {'messages.createdat':-1}},
                {$group:{_id: '$_id', messages:{$push:"$messages"}}}
            ])

            if(!userInDb){
                return Response.json({
                    success:false,
                    message:"User not found"
                },{status:400})
            }

            return Response.json({
                success:true,
                message:"Messages fetched successfully",
                messages:userInDb[0].messages
            })

        }catch(err){
            console.error("Failed to fetch messages ",err);
            return Response.json({
                success:false,
                message:"Failed to fetch messages"
            },{status:500})
        }
}