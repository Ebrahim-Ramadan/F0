'use client';
import React, { useState, useEffect, useRef } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
const videoAvailable = ['/f0-1.mp4', '/f0-2.mp4'];
const SponserComponent = dynamic(() => import('./SponserComponent'), {
  ssr: false,
});
const VideoComponent = ({loggedIN}) => {
  const [videoSrc, setVideoSrc] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleCanPlay = () => {
    setIsLoading(false);
  };
  const loadingImage = '/landing-vodeo-thumbnail.png'; // Replace with your loading image path

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoAvailable.length);
    setVideoSrc(videoAvailable[randomIndex]);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
  <div className="absolute top-0 bg-gradient-to-b from-primary-200 to-transparent z-20 w-full h-16"></div>

  <div className="w-full flex-grow relative">
    <div className='absolute h-full flex flex-col justify-center items-center text-white z-20 w-full bg-primary-50 bg-opacity-20 backdrop-blur-xs px-2 md:px-8'>
<div className="w-full md:w-1/2 space-y-2 md:space-y-2 bg-primary-50 bg-opacity-20 backdrop-blur-2xl p-3 py-4 md:p-6 rounded-3xl ">
              <div className="inline-block rounded-lg transition-all duration-300 hover:bg-primary-200 bg-primary-100 px-3 py-1 text-xs items-center font-bold flex w-fit gap-1 flex-row">
                Inspired by 
               <Image
               src='/assets/v0.svg'
               width={20}
               height={20}
               alt='V0'
               />
              </div>
              <h1 className="text-primary-900 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl ">
                Welcome to <span className="text-primary-950">F0</span>
              </h1>
              <p className="mt-2 text-primary-800 text-lg md:text-xl tracking-tight  leading-6">
              remove your background within milliseconds.
              </p>
              <button className="mt-2 md:mt-4 flex justify-end w-full">
                <Link href={loggedIN?`/images`:'/join'} className='group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-bold text-black  transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))] bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]'>
                  {loggedIN ?
                'Upload Images':
                'Sign Up'  
                }
                  </Link>

              </button>
            </div>
    </div>
    {isLoading &&  (
     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
     <img src={loadingImage} alt="Loading" className="w-full h-full object-cover" />
   </div>
    )}
    {videoSrc && (
      <>
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted={isMuted}
          onCanPlay={handleCanPlay}
          className="w-full h-screen  object-cover z-0 relative"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <button 
          onClick={toggleMute}
          className="absolute bottom-20 right-6 z-30 p-2 bg-primary-100 backdrop-blur-lg rounded-full text-white hover:bg-opacity-75 transition-all duration-300"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </>
    )}
    <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-primary-50 to-transparent z-10"></div>
    <div className="absolute bottom-20 left-6  z-20 text-lg md:text-xl">
                  <SponserComponent/>
                </div>
  </div>
</div>

  );
};

export default VideoComponent;