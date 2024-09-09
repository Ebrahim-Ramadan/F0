import { cookies } from 'next/headers';
import { getUserById } from '@/app/actions';

const USER_SESSION_KEY = 'userId';

// Utility function to get a session cookie
function getCookie(name) {
  const cookieStore = cookies();
  return cookieStore.get(name)?.value;
}

// Utility function to set a session cookie
function setCookie(name, value, options= {}) {
  const cookieStore = cookies();
  cookieStore.set(name, value, options);
}

// Utility function to delete a session cookie
function deleteCookie(name) {
  const cookieStore = cookies();
  cookieStore.delete(name);
}

// Functions to manage user sessions
export async function getUserId() {
  const userId = getCookie(USER_SESSION_KEY);
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

export async function requireUserId(redirectTo) {
  const userId = await getUserId();
  if (!userId) {
    // Redirect to login page with a redirectTo query parameter
    return { redirect: `/login?redirectTo=${encodeURIComponent(redirectTo)}` };
  }
  return userId;
}

export async function requireUser() {
  const userId = await requireUserId('/');
  const user = await getUserById(userId);
  if (user) return user;

  await logout();
  return null;
}

export async function createUserSession(userId, remember, redirectTo) {
  const options = {
    maxAge: remember ? 60 * 60 * 24 * 7 : undefined, // 7 days if remember
    path: '/',
    httpOnly: true,
  };

  setCookie(USER_SESSION_KEY, userId, options);
  return { redirect: redirectTo };
}

export async function logout() {
  deleteCookie(USER_SESSION_KEY);
  return { redirect: '/' };
}
