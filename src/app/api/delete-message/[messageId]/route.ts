import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

interface DeleteMessageParams{
    params:{
        messageId:string;
    }
}

export async function DELETE(req:Request,{params}:DeleteMessageParams) {
    const session=await getServerSession(authOptions);
    const user= session?.user;
    const {messageId}=params;
    await dbConnect();
    if(!session || !user){
        return Response.json({
            success:false,
            message:"User not found"
        },{status:400})
    }
    try{

        const updateResult= await UserModel.updateOne({
            _id:user._id
        },{
            $pull:{
                messages:{
                    _id:messageId
                }
            }
        })

        if(updateResult.modifiedCount===0){
            return Response.json({
                success:false,
                message:"No message found to be deleted"
            },{status:401})
        }

        return Response.json({
            success:true,
            message:"Message deleted successfully"
        })

    }catch(err){
        console.error("Error occured while deleting message: ",err);
        return Response.json({
            success:false,
            message:"Failed to delete message"
        },{status:500})

    }
}