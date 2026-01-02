import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { usernameValidation } from "@/schemas/signUpSchema";
import { request } from "http";


export async function GET(req:Request){
    try{
        await dbConnect();
        const {searchParams}= new URL(req.url);
        const username= searchParams.get("username");

        const result = usernameValidation.safeParse(username);
        if(!result.success){
            const usernameErrors=result.error.format()._errors || [];
            return Response.json({
                success:false,
                message: usernameErrors.length>0? usernameErrors.join(', '): "Invalid query parameter"
            },{status:400})
        }
        
        const existingVerifiedUser=await UserModel.findOne({
            username:result.data,
            isVerified:true
        });

        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message:"Username already in use"
            },{status:400})
        }

        return Response.json({
            success:true,
            message:"Username is unique"
        })
    
    }catch(err){
        console.log("Error in checking username ",err);

        return Response.json({
            success:false,
            message:"Error checking username"
        },{status:500})

    }
}