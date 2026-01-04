import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { usernameValidation } from "@/schemas/signUpSchema";
import { verifySchema } from "@/schemas/verifySchema";

export async function POST(req:Request){

    try{
        await dbConnect();
        const body= await req.json();
      

        const result = verifySchema.safeParse(body);

        if(!result.success){
            const verifyCodeErrors= result.error.format()._errors || [];
            return Response.json({
                success:false,
                message:verifyCodeErrors.length>0? verifyCodeErrors.join(", "): "Invalid query parameter"
            },{status:400})
        }
        
        const user=await UserModel.findOne({
            username:result.data.username
        })
        
        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            },{status:401})
        }

        if(user.isVerified){
            return Response.json({
                success:false,
                message:"User is already verified"
            },{status:401})
        }

        if(user.verifyCode!==result.data.code || (user.verifyCodeExpiry< new Date())){
            return Response.json({
                success:false,
                message:"Wrong verify code or verification code expired"
            },{status:400})
        }

        user.isVerified=true;
        await user.save();

        return Response.json({
            success:true,
            message:"User verified successfully"
        })
        

    }catch(err){
        console.log("Error in verifying code ",err);
        return Response.json({
            success:false,
            message:"Error in verifying code"
        },{status:500})
    }

}