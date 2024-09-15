import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Subscription", 
  description: "F0 Subscription",
};

export default async function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
   
    return (
      <div className="min-h-screen items-center w-full flex flex-col justify-center py-12 px-2 sm:px-6 lg:px-8">
      {children}
      </div>
    );
  }