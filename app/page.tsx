import {  ArrowRightIcon,  Plus,  StarsIcon  } from 'lucide-react';
import DynamicVideoComponent from '@/components/Home/VideoComponent';
import { HeroSections } from '@/components/Home/HeroSections';

import {  getUserId } from './actions';


export default async function Home() {
  const userId = await getUserId();

  return (
  <div className="min-h-screen  w-full flex mx-auto flex-col items-center justify-center">

    <DynamicVideoComponent loggedIN={userId?true:false}/>
    <section className='pb-12 md:pb-24 flex flex-col items-center justify-center w-full h-full'>
  <div className='w-full h-full flex flex-col items-center justify-center mt-[-2rem] z-50'>
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



      <div className="bg-gradient-to-b from-black to-primary-50  h-1/2 w-full">
    <div className="w-full p-2 md:p-4">
     <HeroSections/>
    </div>
  </div>
  <div className="relative w-full h-[40vh] flex items-center justify-center bg-gradient-to-b from-primary-50 to-primary-100">
      <Plus className="absolute top-2 left-4 md:left-8 text-white opacity-50" size={20} />
      <Plus className="absolute top-2 right-4 md:right-8 text-white opacity-50" size={20} />
      <Plus className="absolute bottom-2 left-4 md:left-8 text-white opacity-50" size={20} />
      <Plus className="absolute bottom-2 right-4 md:right-8 text-white opacity-50" size={20} />
      
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            1145 people joined
          </span>
        </h1>
        <a href={`${userId? 'images':'join'}`} className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300">
          {userId ? 'Get Started' : 'Join Now'}
        </a>
      </div>
    </div>

</div>
      </section>
    </div>
  );
}