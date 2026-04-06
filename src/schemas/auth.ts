import { z } from "zod";

export const formDataSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(6),
});

export type FormData = z.infer<typeof formDataSchema>;

export const userDataSchema = z.object({
  id: z.string(),
  email: z.email(),
});

export type UserData = z.infer<typeof userDataSchema>;
