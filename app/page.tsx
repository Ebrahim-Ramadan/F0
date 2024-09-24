import {  ArrowRightIcon,  Plus,  Star,  StarsIcon  } from 'lucide-react';
import {  getUserId } from './actions';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Bento } from '@/components/Home/Bento';
import { Suspense } from 'react';
import LoadingDots from '@/components/Globals/LoadingDots';
import Image from 'next/image';
const HeroSections = dynamic(() => import('@/components/Home/HeroSections'), {
  ssr: false,
});
const DynamicVideoComponent = dynamic(() => import('@/components/Home/VideoComponent'), {
  ssr: false,
});
export default async function Home() {
  const userId = await getUserId();

  return (
  <div className="min-h-screen  w-full flex mx-auto flex-col items-center justify-center">

    <DynamicVideoComponent loggedIN={userId?true:false}/>
    <section className='pb-6 md:pb-24 flex flex-col items-center justify-center w-full h-full'>
  <div className='w-full h-full flex flex-col items-center justify-center mt-[-4rem] z-50'>
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
      <div className='w-2 h-10 md:h-12 bg-blue-500 rounded-lg'>
      </div>
        <div className='flex flex-col'>
        <span className='text-xl md:text-2xl font-bold text-white'>
          WHAT PEOPLE DID
        </span>
        <p className='text-primary-700 text-xs md:text-sm'>
          See Youself
        </p>
        </div>
        
      </div>
      <Link href={`/${userId? 'images':'join'}`} className='flex gap-2 flex-row items-center text-primary-800 hover:text-primary-900 transition-colors duration-300 cursor-pointer'>
        Go 
        <ArrowRightIcon size='16' className='w-4 h-4'/>
        </Link>
      </div>



      <div className="bg-gradient-to-b from-black to-primary-50  h-1/2 w-full">
    <div className="w-full p-2 md:p-4">
      <Suspense fallback={
        <div className='min-h-screen w-full flex-justify-center items-center'>
          <LoadingDots/>
        </div>
      }>
      <HeroSections/>

      </Suspense>
    </div>
  </div>
  <div className="flex items-center space-x-3 bg-black text-white p-3 rounded-md">
  <div className="flex-row flex items-center justify-center [&>*]:rounded-full">
    <Image src="/examples/1-no-bg.webp" alt="Avatar 1" className="w-10 h-10 object-cover" width={200} height={200}/>
    <Image src="/examples/2-no-bg.jpg" alt="Avatar 2" className="ml-[-1rem] w-10 h-10 object-cover" width={200} height={200}/>
  </div>

  <div>
    <div className="flex space-x-1 text-yellow-400">
      <Star fill='#FACC15' strokeWidth={1}/>
      <Star fill='#FACC15' strokeWidth={1}/>
      <Star fill='#FACC15' strokeWidth={1}/>
      <Star fill='#FACC15' strokeWidth={1}/>
      <Star fill='#FACC15' strokeWidth={1}/>
    </div>

    <p className="text-sm text-primary-950 font-semibold">Trusted by +5400 Users</p>
  </div>
</div>

  {/* <div className="blur-container relative w-full h-[40vh] flex items-center justify-center bg-gradient-to-b from-primary-50 to-primary-100">
      <Plus strokeWidth='1' className="z-40 absolute top-2 left-4 md:left-8 text-white opacity-60" size={20} />
      <Plus strokeWidth='1' className="z-40 absolute top-2 right-4 md:right-8 text-white opacity-60" size={20} />
      <Plus strokeWidth='1' className="z-40 absolute bottom-2 left-4 md:left-8 text-white opacity-60" size={20} />
      <Plus strokeWidth='1' className="z-40 absolute bottom-2 right-4 md:right-8 text-white opacity-60" size={20} />
      <div className="blur bg-black  z-10"  ></div>
        <div className="blur bg-white z-10"  ></div>
        <div className="blur bg-blue-600 z-10" ></div>
        <div className="blur bg-purple-400 z-10" ></div>
      <div className="blur bg-black  z-10"  ></div>
        <div className="blur bg-white z-10"  ></div>
        <div className="blur bg-blue-800 z-10" ></div>
        <div className="blur bg-purple-600 z-10" ></div>
        <div className="absolute top-0 bg-gradient-to-b from-black to-transparent z-20 w-full h-56"></div>
        <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent z-20 w-full h-56"></div>

      <div className="z-30 text-center bg-primary-50 bg-opacity-20 backdrop-blur-2xl flex space-y-4 flex-col justify-center items-center h-full w-full px-4 md:px-8 py-12 ">
        <h1 className="text-4xl md:text-7xl font-bold text-white ">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-900 to-primary-950 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            1145 PEOPLE JOINED
          </span>
        </h1>
        <Link href={`${userId? 'images':'join'}`} className="bg-white text-blue-900 px-3 py-1.5 md:px-6 md:py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300">
          {userId ? 'GET STARTED' : 'JOIN NOW'}
        </Link>
      </div>

    </div> */}
</div>
      </section>
      <Bento/>
    </div>
  );
}