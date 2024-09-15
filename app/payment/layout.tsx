import { Join } from "@/components/Join";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { getUserById, logout } from "../actions";
export const metadata : Metadata = {
  title: "Subscription", 
  description: "F0 Subscription",
};
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
export default async function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const user  = await getUser()
    if (!user){
      return(
          <Join/>
      );
  }
    return (
      <div className="min-h-screen items-center w-full flex flex-col justify-center py-12 px-2 sm:px-6 lg:px-8">
      {children}
      </div>
    );
  }