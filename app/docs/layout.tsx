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
 {children}
 </div>
    )
  }