import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster, toast } from 'sonner'
import { cookies } from "next/headers";
import { getUserById, logout } from "./actions";
import { Header } from "@/components/Globals/Header";
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
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "F0",
  description: "remove you background within milliseconds",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user  = await getUser()
  console.log('user', user);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary-50`}
      >
    <Header user={user && user}/>

         <Toaster position="bottom-right" richColors  theme="dark"/>

        {children}
      </body>
    </html>
  );
}
