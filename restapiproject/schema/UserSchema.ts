import { z } from "zod";

export const userSchema = z.object({
  name: z.string().optional(),
  age: z.number().optional(),
  job: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

