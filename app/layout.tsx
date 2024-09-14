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
    images: [
      {
        url: "https://f0.pics/meta.png",
        width: 1200,
        height: 630,
        alt: "F0",
      },
      {
        url: "https://f0.pics/meta.png",
        width: 800,
        height: 450,
        alt: "F0",
      },
      {
        url: "https://f0.pics/meta.png",
        width: 700,
        height: 400,
        alt: "F0",
      },
      {
        url: "https://f0.pics/meta.png",
        width: 600,
        height: 300,
        alt: "F0",
      },
      {
        url: "https://f0.pics/meta.png",
        width: 500,
        height: 200,
        alt: "F0",
      },
      {
        url: "https://f0.pics/meta.png",
        width: 375,
        height: 150,
        alt: "F0",
      },
      {
        url: "https://f0.pics/meta.png",
        width: 250,
        height: 100,
        alt: "F0",
      },
    ],
    // site_name: "F0",
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