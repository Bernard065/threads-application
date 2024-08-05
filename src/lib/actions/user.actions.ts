"use server";

import { FilterQuery, SortOrder } from "mongoose";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.models";

// Update user in the database
export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: UserParams): Promise<void> {
  // Connect to database
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true } // If the user does not exist, create a new one
    );

    // Check if the path is "/profile/edit"
    // Revalidate the "/profile/edit" page to reflect the updated user information
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
  }
}

// Fetch a user
export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
  } catch (error) {
    console.log(error);
  }
}

// Fetch users
export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    // Calculate how many users to skip based on the page number and page size
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a regular expression for the search string, case-insenstive
    const regex = new RegExp(searchString, "i");

    // Set up the query object to find users, excluding the current user by id
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }, // Exclude the user with the given userId
    };

    // If a search string is provided and not empty, add search criteria(by username or name)
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Set up the sort options based on the createdAt field by the provided sort order
    const sortOptions = { createdAt: sortBy };

    // Create a query to find users with specified conditions
    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // Get the toal number of users matching the query
    const totalUsersCount = await User.countDocuments(query);

    // Execute the query to get the actual list of users
    const users = await usersQuery.exec();

    // Determine if there are more users beyond the current page
    const isNext = totalUsersCount > skipAmount + users.length;

    // Return the list of users and a flag indicating if there;s a next page
    return { users, isNext };
  } catch (error) {
    console.log(error);
  }
}

// Get Activity
export async function getActivity(userId: string) {
  try {
    connectToDB();

    //Find all threads created by the user
    // THis fetches an array of thread objects where the author field matches the provided userId
    const userThreads = await Thread.find({ author: userId });

    // Collect all the child threads from threads
    const childThreads = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    // Get comments excluding the ones for current user
    const comments = await Thread.find({
      _id: { $in: childThreads },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    return comments;
  } catch (error) {
    console.log(error);
  }
}
