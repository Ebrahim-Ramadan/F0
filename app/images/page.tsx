import { ImageUpload } from "@/components/ImageUpload";
import { Join } from "@/components/Join";
import { cookies } from "next/headers";
import { getUserById, logout } from "../actions";
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
  console.log('user', user);
  
if (!user){
    return(
        <Join/>
    );
}
return(
    <ImageUpload user={user}/>

)
}