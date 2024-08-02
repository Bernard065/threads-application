import { z } from "zod";

export const userValidation = z.object({
  profile_photo: z.string().url().min(3),
  name: z
    .string()
    .min(3, { message: "Name must be more than 3 characters" })
    .max(50, { message: "Name must not be more than 50 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be more than 3 characters" })
    .max(50, { message: "Username must not be more than 50 characters" }),
  bio: z
    .string()
    .min(3, { message: "Bio must be more than 3 characters" })
    .max(1000, { message: "Bio must be more than 3 characters" }),
});
