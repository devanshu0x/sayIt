import {z} from "zod"
import { usernameValidation } from "./signUpSchema"


export const messageSchema= z.object({
    username:usernameValidation,
    content: z.string()
    .min(10,"Content must be atleast 10 characters")
    .max(500,"Content must be no longer than 500 characters")
})