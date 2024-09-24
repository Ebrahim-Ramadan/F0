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
     <div className="-z-50 absolute w-[150px] h-[150px] bg-neutral-100 z-[-1] blur-[200px] top-0 bottom-0 left-0 right-0 m-auto rounded-full"></div>

      {children}
      </div>
    );
  }