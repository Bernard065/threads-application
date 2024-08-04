import { z } from "zod";

export const postValidation = z.object({
  thread: z.string().min(3, {
    message: "Thread must be at least 2 characters.",
  }),
  accountId: z.string(),
});

export const commentValidation = z.object({
  thread: z.string().min(3, {
    message: "Thread must be at least 2 characters.",
  }),
});

