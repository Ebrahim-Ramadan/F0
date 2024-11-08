import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner'
import {  getUser, getUserById, getUserId, logout } from "./actions";
import { Header } from "@/components/Globals/Header";
import { Footer } from "@/components/Globals/Footer";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

  
  //  async function getUser() {
  //   const userId = await getUserId();
  //   if (!userId) return null;
  
  //   const user = await getUserById(userId);
  //   if (user) return user;
  
  //   await logout();
  //   return null;
  // }

export const metadata: Metadata = {
  description: "Remove your background within milliseconds",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  title: {
    default: 'F0',
    template: `%s / F0`,
  },
  openGraph: {
    title: "F0",
    description: "Remove your background within milliseconds",
 
    url: "https://f0-the-project.vercel.app/",
    images: [
      {
        url: "https://f0-the-project.vercel.app/og",
        alt: "Remove your background within milliseconds",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@scoopsahoykid",
    title: "F0",
    description: "Remove your background within milliseconds",
    images: [
      {
        url: "https://f0-the-project.vercel.app/og",
        alt: "Remove your background within milliseconds",
      },
    ],
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
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5719854631698521"
     crossOrigin="anonymous"></script>
     <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
<link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet"/>
<link rel="dns-prefetch" href="//placewaifu.com" />
<link rel="dns-prefetch" href="//ik.imagekit.io" />
<link rel="dns-prefetch" href="//avatars.githubusercontent.com" />
<link rel="dns-prefetch" href="//lh3.googleusercontent.com" />
<link rel="dns-prefetch" href="//raw.githubusercontent.com" />
      </head>
      <body
        className={`${GeistSans.className} ${GeistMono.className} antialiased bg-primary-50`}
      >
     <div className="-z-50 absolute w-[150px] h-[150px] bg-neutral-100 z-[-1] blur-[200px] top-0 bottom-0 left-0 right-0 m-auto rounded-full"></div>
{/* @ts-ignore */}
    <Header user={user && user}/>

         <Toaster position="top-center" richColors  theme="dark"/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}

export const revalidate = 25200; // Prevent Next.js from using a cache