"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/schema";

// Function to get a user by ID
export const getUserById = async (id: number) => {
  const data = await db.select().from(users).where(eq(users.id, id));
  return data.length > 0 ? data[0] : null; // Return the first user or null if not found
};

// Function to add a new user
export const addUser = async (username: string, password: string) => {
  await db.insert(users).values({
    username: username,
    password: password,
  });

  revalidatePath("/"); // Revalidate the cache or any relevant paths
};

// Function to delete a user by ID
export const deleteUser = async (id: number) => {
  await db.delete(users).where(eq(users.id, id));

  revalidatePath("/"); // Revalidate the cache or any relevant paths
};
