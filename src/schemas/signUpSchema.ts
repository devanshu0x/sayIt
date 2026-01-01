import {z} from "zod";

export const usernameValidation= z
    .string()
    .min(2,"Username must be atleast 2 characters")
    .max(20, "Username must be atleast 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")

export const signUpSchema=z.object({
    username:usernameValidation,
    email: z.email({error:"Invalid Email address"}),
    password:z.string().min(6,"Password must me atleast 6 characters")
})    