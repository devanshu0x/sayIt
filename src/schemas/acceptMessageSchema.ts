import {z} from "zod"

export const acceptMeassageSchema=z.object({
    acceptMessage: z.boolean()
})