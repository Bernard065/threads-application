"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { usePathname, useRouter } from "next/navigation";
import { commentValidation } from "@/lib/validations/post";
import Image from "next/image";

const Comments = ({
  threadId,
  currentUserImage,
  currentUserId,
}: CommentsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof commentValidation>>({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      thread: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof commentValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center w-full gap-3">
              <FormLabel>
                <Image
                  src={currentUserImage}
                  alt="profile"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  placeholder="Write your comment here..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="comment-btn" type="submit">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comments;
