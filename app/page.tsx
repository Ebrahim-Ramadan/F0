import React from 'react';
import dynamic from 'next/dynamic';
import {  Heart, StarsIcon  } from 'lucide-react';
import Image from 'next/image';


const DynamicVideoComponent = dynamic(() => import('@/components/VideoComponent'), {
  ssr: true,
});

export default function Home() {
  return (
  <div className="min-h-screen  w-full flex mx-auto flex-col items-center justify-center">
    <DynamicVideoComponent />
    <section className='pb-12 md:pb-24 flex flex-col items-center justify-center w-full h-full'>
  <div className='w-full h-full flex flex-col items-center justify-center'>
    <div className='w-full justify-center flex flex-col items-center'>
    <div className='flex flex-row gap-2 items-center justify-center bg-gradient-to-r from-primary-200 to-primary-100 rounded-full p-2 hover:bg-red-200 transition-colors'>
    <StarsIcon className='w-8 h-8 md:w-10 md:h-10 bg-blue-900 flex items-center justify-center p-2 rounded-full'/>
    <span className='font-semibold'>Inspired by 
      <a href='https://pic.ping.gg/' className="px-1 tracking-tight">pic<span className="text-[#E24B8C]">thing</span></a>
    </span>
  </div>
    </div>
    <div className='w-full h-full flex flex-row items-center gap-2 px-4 py-2'>
      <div className='w-2 h-10 bg-blue-500 rounded-lg'>
      </div>
        <span className='text-2xl md:text-4xl font-bold text-white'>
          See What People Did
        </span>
      </div>
<div className="bg-gradient-to-b from-primary-50 to-primary-100 min-h-screen w-full">
  <div className="w-full pt-2">
    <div className="p-2 md:p-4 columns-2 md:columns-3 lg:columns-4 gap-4">
      <div className="group break-inside-avoid bg-primary-200 rounded-lg ">
        <div className="flex flex-col w-full relative">
        <Image
        className='rounded-lg transition-transform duration-300 group-hover:scale-105'
          width={1000}
          height={1000}
          alt='Picthing'
          src='/examples/1.jpg'
          />
          <div className='absolute bottom-2 right-2 flex flex-row items-center gap-1'>
            <span className='font-semibold text-xs md:text-sm text-primary-800'>466</span>
<Heart  fill='#3B82F6' stroke='0' className='w-3 md:w-4'/>
          </div>
        </div>
      </div>
      <div className="group break-inside-avoid mt-2 md:mt-4 bg-primary-200 rounded-lg ">
       <div className="flex flex-col relative">
          <Image
          className='rounded-lg transition-transform duration-300 group-hover:scale-105'
          width={1000}
          height={1000}
          alt='Picthing'
          src='/examples/2.jpg'
          />
         <div className='absolute bottom-2 right-2 flex flex-row items-center gap-1'>
          <span className='font-semibold text-xs md:text-sm text-primary-800'>223</span>
<Heart  fill='#3B82F6' stroke='0' className='w-3 md:w-4'/>
          </div>
        </div>
      </div>
      <div className="group break-inside-avoid mt-2 md:mt-4 bg-primary-200 rounded-lg ">
        <div className="flex flex-col relative">
        <Image
        className='rounded-lg transition-transform duration-300 group-hover:scale-105'
          width={1000}
          height={1000}
          alt='Picthing'
          src='/examples/3.jpg'
          />
         <div className='absolute bottom-2 right-2 flex flex-row items-center gap-1'>
          <span className='font-semibold text-xs md:text-sm text-primary-800'>656</span>
<Heart fill='#3B82F6' stroke='0' className='w-3 md:w-4'/>
          </div>
        </div>
      </div>
      <div className="group break-inside-avoid mt-2 md:mt-4 bg-primary-200 rounded-lg ">
        <div className="flex flex-col relative">
        <Image
        className='rounded-lg transition-transform duration-300 group-hover:scale-105'
          width={1000}
          height={1000}
          alt='Picthing'
          src='/examples/4.jpg'
          />
          <div className='absolute bottom-2 right-2 flex flex-row items-center gap-1'>
          <span className='font-semibold text-xs md:text-sm text-primary-800'>647</span>
<Heart fill='#3B82F6' stroke='0' className='w-3 md:w-4'/>
          </div>
        </div>
      </div>
      <div className="group break-inside-avoid mt-2 md:mt-4 bg-primary-200 rounded-lg ">
        <div className="flex flex-col relative">
        <Image
        className='rounded-lg transition-transform duration-300 group-hover:scale-105'
          width={1000}
          height={1000}
          alt='Picthing'
          src='/examples/10.jpg'
          />
           <div className='absolute bottom-2 right-2 flex flex-row items-center gap-1'>
          <span className='font-semibold text-xs md:text-sm text-primary-800'>974</span>
<Heart fill='#3B82F6' stroke='0' className='w-3 md:w-4'/>
          </div>
        </div>
      </div>
      <div className="group break-inside-avoid mt-2 md:mt-4 bg-primary-200 rounded-lg ">
        <div className="flex flex-col relative">
        <Image
        className='rounded-lg transition-transform duration-300 group-hover:scale-105'
          width={1000}
          height={1000}
          alt='Picthing'
          src='/examples/6.jpg'
          />
           <div className='absolute bottom-2 right-2 flex flex-row items-center gap-1'>
          <span className='font-semibold text-xs md:text-sm text-primary-800'>870</span>
<Heart fill='#3B82F6' stroke='0' className='w-3 md:w-4'/>
          </div>
        </div>
      </div>
      <div className="group break-inside-avoid mt-2 md:mt-4 bg-primary-200 rounded-lg ">
        <div className="flex flex-col relative">
        <Image
        className='rounded-lg transition-transform duration-300 group-hover:scale-105'
          width={1000}
          height={1000}
          alt='Picthing'
          src='/examples/7.jpg'
          />
           <div className='absolute bottom-2 right-2 flex flex-row items-center gap-1'>
          <span className='font-semibold text-xs md:text-sm text-primary-800'>214</span>
<Heart fill='#3B82F6' stroke='0' className='w-3 md:w-4'/>
          </div>
        </div>
      </div>
      <div className="group break-inside-avoid mt-2 md:mt-4 bg-primary-200 rounded-lg ">
        <div className="flex flex-col relative">
        <Image
        className='rounded-lg transition-transform duration-300 group-hover:scale-105'
          width={1000}
          height={1000}
          alt='Picthing'
          src='/examples/9.jpg'
          />
           <div className='absolute bottom-2 right-2 flex flex-row items-center gap-1'>
          <span className='font-semibold text-xs md:text-sm text-primary-800'>631</span>
<Heart fill='#3B82F6' stroke='0' className='w-3 md:w-4'/>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
      </section>
    </div>
  );
}