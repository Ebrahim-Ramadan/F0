import { Pay } from "@/components/payment/Pay";
import { cookies } from "next/headers";
import { getUserById, logout } from "../actions";
import { Join } from "@/components/Join";
import PaidSuccessfully from "@/components/payment/PaidSuccessfully";


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
export default async function Home() {
     const user  = await getUser()
    if (!user){
      return(
          <Join/>
      );
  }
  if(user.paymentDate){
    return(
    // @ts-ignore
      <PaidSuccessfully user={user}/>
    )
  }
return(
    // @ts-ignore
    <Pay user={user}/>
)
}