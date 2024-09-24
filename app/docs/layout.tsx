import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Docs",
    description:
      "All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.",
  };
export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
 <div>
     <div className="-z-50 absolute w-[150px] h-[150px] bg-neutral-100 z-[-1] blur-[200px] top-0 bottom-0 left-0 right-0 m-auto rounded-full"></div>

 {children}
 </div>
    )
  }