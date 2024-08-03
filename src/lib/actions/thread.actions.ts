"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.models";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function createThread({
  text,
  author,
  communityId,
  path,
}: ThreadParams) {
  try {
    connectToDB();

    // Create Thread
    const createThread = await Thread.create({
      text,
      author,
      community: null,
    });

    // Update user model(push the created thread to user who created it)
    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
