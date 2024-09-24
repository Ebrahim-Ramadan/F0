import { getUser } from "@/app/actions"
import Image from "next/image"
import Link from "next/link"
import {OhMyAss} from '@/components/payment/success/Ass'
export default async function Home() {
  const user  = await getUser()

  return (
    <div className="flex items-center justify-center h-[50vh] ">
      <div className="w-full max-w-md">
      <OhMyAss user={user}/>
        
        <div className='flex justify-center items-center'>
        <Link href='/images' className="bg-primary-950 text-black px-4 py-2 rounded-3xl text-sm md:text-base  font-bold" >
          UPLOAD IMAGES
        </Link>
      </div>
      </div>
    </div>
  )
}