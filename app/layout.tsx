import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster, toast } from 'sonner'
import { cookies } from "next/headers";
import { getUserById, logout } from "./actions";
import { Header } from "@/components/Globals/Header";
 async function getUserId() {
    const cookieStore = cookies();
    const userId = cookieStore.get('userID')?.value;
    return userId;
  }
  
   async function getUser() {
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary-50`}
      >
     <div className="-z-50 absolute w-[150px] h-[150px] bg-neutral-100 z-[-1] blur-[200px] top-0 bottom-0 left-0 right-0 m-auto rounded-full"></div>

    <Header user={user && user}/>

         <Toaster position="bottom-right" richColors  theme="dark"/>

        {children}
      </body>
    </html>
  );
}

export const revalidate = 0; // Prevent Next.js from using a cache
export const dynamic = 'force-dynamic'; // Force dynamic behavior