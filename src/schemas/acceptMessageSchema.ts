import {z} from "zod"

export const acceptMeassageSchema=z.object({
    isAcceptingMessage:z.boolean()
})