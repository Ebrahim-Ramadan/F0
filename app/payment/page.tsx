import { Pay } from "@/components/payment/Pay";
import { getUserById, getUserId, logout } from "../actions";
import { Join } from "@/components/Join";
import PaidSuccessfully from "@/components/payment/PaidSuccessfully";


  
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