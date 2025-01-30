import { z } from "zod";

export const profileSchema = z.object({
   username: z.string().min(3),
   email: z.string().email(),
   phone: z.string().optional(),
   address: z.string().optional(),
});