import { geminiModel } from "@/lib/aiModel";;
import { generateText } from "ai";

export const runtime = "edge";

export async function GET(req:Request){
    try{
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
            prompt:"Create a list of 3 open-ended and engagging questions as a list formatted as a single string. Each questions should be seperated by '||'. These questions are for anonymous social messaging app and should be suitable for diverse audience. Avoid personal or sensitive topics and focus on universal themes that encourage friendly instructions "
        })

        return Response.json({
            success:true,
            message:"suggested messages successfully",
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