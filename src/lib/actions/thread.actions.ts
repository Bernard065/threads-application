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

// Fetch threads
export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  try {
    connectToDB();

    // Calculate the number of threads to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch threads that have no parents(top-level threads)
    const threadsQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalthreadsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const threads = await threadsQuery.exec();

    const isNext = totalthreadsCount > skipAmount + threads.length;

    return { threads, isNext };
  } catch (error) {
    console.log(error);
  }
}

export async function fetchThreadById(id: string) {
  try {
    connectToDB();

    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id image parentId name",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error) {
    console.log(error);
  }
}

// Create a comment to a thread
export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  try {
    connectToDB();

    // Find original thread by id
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create new thread with comment text
    const newComment = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    // Save the new thread
    const savedNewComment = await newComment.save();

    // Update the original thread to include the new comment
    originalThread.children.push(savedNewComment._id);

    // Save original thread
    await originalThread.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserThreads(userId: string) {
  try {
    connectToDB();

    // Find all threads authored by user with the given userId
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });

    return threads;
  } catch (error) {
    console.log(error);
  }
}
