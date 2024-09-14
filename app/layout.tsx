import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner'
import { cookies } from "next/headers";
import { getUserById, logout } from "./actions";
import { Header } from "@/components/Globals/Header";
import { Footer } from "@/components/Globals/Footer";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

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

export const metadata: Metadata = {
  // title: "F0",
  description: "Remove your background within milliseconds",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
    // "apple-touch-icon": "/favicon.ico",
  },
  title: {
    default: 'F0',
    template: `%s / F0`,
  },
  openGraph: {
    title: "F0",
    description: "Remove your background within milliseconds",
 
    url: "https://f0.pics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@f0pics",
    title: "F0",
    description: "Remove your background within milliseconds",
    images: ["https://f0.pics/meta.png"],
  },
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
        className={`${GeistSans.className} ${GeistMono.className} antialiased bg-primary-50`}
      >
     <div className="-z-50 absolute w-[150px] h-[150px] bg-neutral-100 z-[-1] blur-[200px] top-0 bottom-0 left-0 right-0 m-auto rounded-full"></div>
{/* @ts-ignore */}
    <Header user={user && user}/>

         <Toaster position="bottom-right" richColors  theme="dark"/>

        {children}
        <Footer/>
      </body>
    </html>
  );
}

export const revalidate = 25200; // Prevent Next.js from using a cache