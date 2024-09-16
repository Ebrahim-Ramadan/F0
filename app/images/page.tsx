import { ImageUpload } from "@/components/Images/ImageUpload";
import { Join } from "@/components/Join";
import {   getUserId, getUserWithImages } from "../actions";
import { Suspense } from "react";
import LoadingDots from "@/components/Globals/LoadingDots";
import dynamic from "next/dynamic";
import { Metadata } from "next";
const OlderImages = dynamic(() => import("@/components/Images/OlderImages"), {
  ssr: true,
});

  
   async function getUser() {
    const userId = await getUserId();
    if (!userId) return null;
  
    const userWithImages = await getUserWithImages(userId);
    if (userWithImages) return userWithImages;
  }
export default async function Home() {
  const userWithImages  = await getUser()
console.log('userWithImages',userWithImages)

  
if (!userWithImages){
    return(
        <Join/>
    );
}
return(

  <div className="mt-24 p-2 md:p-8 flex flex-col items-center justify-center min-h-screen w-full">
    <Suspense fallback={<LoadingDots/>}>
    {/* @ts-ignore */}
    <ImageUpload user={userWithImages}/>
    </Suspense>
    {/* @ts-ignore */}
    {userWithImages.images.length>0 && <OlderImages user={userWithImages}/>}
  </div>
)
}
export const metadata : Metadata = {
  title: "Your Uploads", 
  description: "Picthing is a social media platform for artists and creatives to share their artwork and connect with other artists.",
};