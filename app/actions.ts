"server only";
import { generateHashString } from "@/utils/utils";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/drizzle";
import { images, Subscribers, users } from "@/lib/schema";
import { cookies } from 'next/headers';


export async function getUserId() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userID')?.value;
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

export async function createUserSession(userId: string, remember: boolean) {
  const cookieStore = cookies();
  cookieStore.set('userID', userId, {
    maxAge: remember ? 60 * 60 * 24 * 30 : undefined, 
    path: '/',
    httpOnly: true,
  });
  revalidatePath("/");
  return true;
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete('userID');
  revalidatePath("/");
  return true;
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

export const addUser = async (
  email: string,
  password: string,
  pic: string
): Promise<{ id: number; username: string } | { error: string }> => {
  try {
    const existingUser = await db
      .select({
        id: users.id,
        username: users.username,
        password: users.password,
        paymentDate : users.paymentDate
      })
      .from(users)
      .where(eq(users.username, email))
      .limit(1);

   
   if (existingUser.length > 0) {
    const user = existingUser[0];

    
    const isPasswordMatch = generateHashString(password) == user.password;

    if (!isPasswordMatch) {
      return { error: "Incorrect Email and Password Combination" };
    }

    
    return user;
  }

    
    const result = await db
      .insert(users)
      .values({
        username: email,
        password: generateHashString(password), 
        pic: pic,
        paymentDate: null
      })
      .returning({ id: users.id, username: users.username , pic: users.pic, paymentDate: users.paymentDate });

    revalidatePath("/");
const user = result[0]
    return user;
  } catch (error) {
    console.error("Error adding user:", error);
    return { error: "Failed to add user" };
  }
};


export const deleteUser = async (id: number) => {
  await db.delete(users).where(eq(users.id, id));
  revalidatePath("/");
};




export async function createImage(userId: number,  afterBgRemoval: string) {
  const newImage = await db.insert(images).values({
    userId,
    afterBgRemoval,
    processedAt: new Date(), 
  }).returning();
  return newImage; 
}

export async function getImagesByUser(userId: number) {
  const userImages = await db.select().from(images).where(eq(images.userId, userId));
  return userImages; 
}

export async function deleteImage(imageId: number) {
  const deletedImage = await db.delete(images)
    .where(eq(images.id, imageId))
    .returning(); 
  return deletedImage;
}
export const getUserWithImages = async (id: string | number) => {
  console.log('id', id);
  
  try {
    const userId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(userId)) {
      console.error('Invalid user ID:', id);
      return null;
    }

    const userData = await db.select().from(users).where(eq(users.id, userId));
    
    if (userData.length === 0) {
      return null;
    }

    const user = userData[0];

    
    const userImages = await db.select().from(images)
    .where(eq(images.userId, userId))
    .limit(10); 
    return {
      ...user,
      images: userImages
    };

  } catch (error) {
    console.error('Error fetching user with images:', error);
    return null;
  }
};


export const addSubscriber = async (
  username: string
): Promise<{ id: number; username: string } | { error: string }> => {
  try {
    const existingSubscriber = await db
      .select({
        id: Subscribers.id,
        username: Subscribers.username,
      })
      .from(Subscribers)
      .where(eq(Subscribers.username, username))
      .limit(1);

    
    if (existingSubscriber.length > 0) {
      return existingSubscriber[0];
    }

    
    const result = await db
      .insert(Subscribers)
      .values({
        username: username,
      })
      .returning({ id: Subscribers.id, username: Subscribers.username });

    return result[0];
  } catch (error) {
    console.error("Error adding subscriber:", error);
    return { error: "Failed to add subscriber" };
  }
};

export const updateUserPayment = async (
  userId: number,
  newPaymentDate: Date,
  subscriptionID: string,
  planName: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const result = await db
      .update(users)
      .set({ 
        paymentDate: newPaymentDate,
        SubscriptionID: subscriptionID,
        planName: planName
      })
      .where(eq(users.id, userId))
      .returning({ 
        id: users.id, 
        paymentDate: users.paymentDate, 
        subscriptionID: users.SubscriptionID,
        planName: users.planName
      });

    if (result.length === 0) {
      return { success: false, error: "User not found" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating user payment details:", error);
    return { success: false, error: "Failed to update payment details" };
  }
};