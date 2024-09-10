"server only";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/schema";
import { cookies } from 'next/headers';


// Server-side only functions
export async function getUserId() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userID')?.value;
  console.log('userId', userId);
  
  return userId;
}

export async function getUser() {
  const userId = await getUserId();
  if (!userId) return null;

  const user = await getUserById(userId);
  if (user) return user;

  await logout();
  return null;
}

export async function requireUserId(redirectTo: string) {
  const userId = await getUserId();
  if (!userId) {
    return { redirect: `/login?redirectTo=${encodeURIComponent(redirectTo)}` };
  }
  return userId;
}

export async function requireUser() {
  const userId = await requireUserId('/');
  if (typeof userId === 'object' && 'redirect' in userId) {
    return userId;
  }
  const user = await getUserById(userId);
  if (user) return user;

  await logout();
  return null;
}

export async function createUserSession(userId: string, remember: boolean, redirectTo: string) {
  const cookieStore = cookies();
  cookieStore.set('userID', userId, {
    maxAge: remember ? 60 * 60 * 24 * 7 : undefined, // 7 days if remember
    path: '/',
    httpOnly: true,
  });
  return { redirect: redirectTo };
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete('userID');
  return { redirect: '/' };
}

export const getUserById = async (id: string | number) => {
  console.log('id', id);
  
  try {
    const userId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(userId)) {
      console.error('Invalid user ID:', id);
      return null;
    }
    const data = await db.select().from(users).where(eq(users.id, userId));
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const addUser = async (email: string, password: string): Promise<{ id: number } | { error: string }> => {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, email))
      .limit(1);

    if (existingUser.length > 0) {
      return { error: "Email already exists" };
    }

    const result = await db
      .insert(users)
      .values({
        username: email,
        password: password, // Note: Ensure you hash this password before storing
      })
      .returning({ insertedId: users.id });

    revalidatePath("/");
    return { id: result[0].insertedId };
  } catch (error) {
    console.error('Error adding user:', error);
    return { error: "Failed to add user" };
  }
};

export const deleteUser = async (id: number) => {
  await db.delete(users).where(eq(users.id, id));
  revalidatePath("/");
};