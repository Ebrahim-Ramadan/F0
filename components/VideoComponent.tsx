'use client';
import React, { useState, useEffect, useRef } from 'react';
import { VolumeX, Volume2, GithubIcon } from 'lucide-react';

const videoAvailable = ['/f0-1.mp4', '/f0-2.mp4'];

const VideoComponent = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

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
    <div className="w-full h-[80vh] md:h-screen flex flex-col">
    <div className="absolute top-0 bg-gradient-to-b from-[#171717] to-transparent z-20 w-full h-16">
        </div>
      <header className="absolute top-0 text-white p-4 z-30 w-full">
      <div className=" mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            {/* <img src='/rubit.svg' className="h-8 w-8 text-primary-foreground" /> */}
            <span className="text-lg font-bold text-primary-foreground">F0</span>
          </a>
          <nav className=" gap-1 flex items-center text-[#006B78] bg-primary-900 backdrop-blur-3xl px-2 py-1 rounded-xl">
           <svg fill="none" viewBox="0 0 16 16" width="16" height="16">
            <path stroke="currentColor" d="M6.833 2C6.368 4.356 6.365 4.356 4 4.833M6.833 2c.47 2.363.473 2.366 2.834 2.833M6.833 2v5.667m2.834-2.834c-2.36.468-2.36.472-2.834 2.834m2.834-2.834H4m2.833 2.834C6.365 5.3 6.358 5.3 4 4.833m0 4.834c-.328 1.663-.33 1.663-2 2m2-2c.332 1.668.334 1.67 2 2m-2-2v4m2-2c-1.666.33-1.666.332-2 2m2-2H2m2 2c-.33-1.67-.336-1.67-2-2m9.667-4.334c-.383 1.94-.386 1.94-2.334 2.334m2.334-2.334c.386 1.946.39 1.949 2.333 2.334m-2.333-2.334V12M14 9.667c-1.944.385-1.944.388-2.333 2.333M14 9.667H9.333M11.667 12c-.386-1.948-.392-1.948-2.334-2.333" stroke-linecap="round" stroke-linejoin="round"></path>
           </svg>
           <span className='text-sm font-bold'>Welcome</span>
          </nav>
          <a href='https://github.com/Ebrahim-Ramadan/nextjs-picthing-indie' target='_blank' className='bg-white rounded-full p-2 flex flex-row items-center gap-2'>
            <GithubIcon size='20' color='black' />
            </a>
        </div>
      </header>
      <div className="w-full flex-grow relative">
        {videoSrc && (
          <>
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted={isMuted}
              className="w-full md:h-screen h-[80vh] object-cover z-10 relative"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <button 
              onClick={toggleMute}
              className="absolute bottom-4 right-4 z-30 p-2 bg-primary-100 backdrop-blur-lg rounded-full text-white hover:bg-opacity-75 transition-all duration-300"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-primary-50 to-transparent z-20">
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;