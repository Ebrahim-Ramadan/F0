import {  ArrowRightIcon,  StarsIcon  } from 'lucide-react';
import DynamicVideoComponent from '@/components/Home/VideoComponent';
import { HeroSections } from '@/components/Home/HeroSections';
import { cookies } from 'next/headers';
import { getUserById, logout } from './actions';
import { Header } from '@/components/Globals/Header';
export async function getUserId() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userID')?.value;
  console.log('userId', userId);
  
  return userId;
}

export async function getUser() {
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
  
  return (
  <div className="min-h-screen  w-full flex mx-auto flex-col items-center justify-center">
    <Header user={user && user}/>

    <DynamicVideoComponent loggedIN={user?true:false}/>
    <section className='pb-12 md:pb-24 flex flex-col items-center justify-center w-full h-full'>
  <div className='w-full h-full flex flex-col items-center justify-center'>
    <div className='w-full justify-center flex flex-col items-center pb-2'>
    <div className='flex flex-row gap-2 items-center justify-center bg-gradient-to-r from-primary-200 to-primary-100 rounded-full p-2 hover:bg-red-200 transition-colors'>
    <StarsIcon className='w-8 h-8 md:w-10 md:h-10 bg-blue-900 flex items-center justify-center p-2 rounded-full'/>
    <span className='font-semibold'>Inspired by 
      <a href='https://pic.ping.gg/' className="px-1 tracking-tight">pic<span className="text-[#E24B8C]">thing</span></a>
    </span>
  </div>
    </div>
    <div className='w-full h-full flex flex-row items-center px-4 md:px-8 py-2 justify-between'>
      <div className='flex gap-2 items-center'>
      <div className='w-2 h-8 md:h-10 bg-blue-500 rounded-lg'>
      </div>
        <span className='text-xl md:text-2xl font-bold text-white'>
           What People Did
        </span>
        
      </div>
      <div className='flex gap-2 flex-row items-center text-primary-800 hover:text-primary-900 transition-colors duration-300 cursor-pointer'>
Start 
<ArrowRightIcon size='16' className='w-4 h-4'/>
        </div>
      </div>



      <div className="bg-gradient-to-b from-primary-50 to-primary-100 min-h-screen w-full">
    <div className="w-full pt-2">
     <HeroSections/>
    </div>
  </div>


</div>
      </section>
    </div>
  );
}