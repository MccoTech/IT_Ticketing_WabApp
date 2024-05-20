import {z} from "zod"

export const ticketSchema = z.object({
   title: z.string().min(1, "Title is requird.").max(255),
    description: z.string().min(1, "Description is requird.").max(255),
    status: z.string().min(1, "status").max(10).optional(),
    priority: z.string().min(1, "priority").max(10).optional(),
   
    })