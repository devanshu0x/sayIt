import { geminiModel } from "@/lib/aiModel";;
import { generateText } from "ai";

export const runtime = "edge";

export async function POST(req:Request){
    try{
        const {message} = await req.json();
        const response= await generateText({
            model:geminiModel,
            providerOptions:{
                google:{
                    safetySettings:[{
                        category:"HARM_CATEGORY_HATE_SPEECH",
                        threshold:"BLOCK_LOW_AND_ABOVE"
                    },
                    {
                        category:"HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold:"BLOCK_LOW_AND_ABOVE"
                    },
                    {
                        category:"HARM_CATEGORY_HARASSMENT",
                        threshold:"BLOCK_LOW_AND_ABOVE"
                    },
                    {
                        category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold:"BLOCK_LOW_AND_ABOVE"
                    },
                    
                ]
                }
            },
            system: "You are a professional proofreader. Return only the corrected text.",
            prompt: message
        })

        return Response.json({
            success:true,
            message:"Proofread successfully",
            output:response.text
        });

    }catch(err){
        console.log("Failed to suggest messages ",err);
        return Response.json({
            success:false,
            message:"Some error occured"
        },{status:500});
    }
}