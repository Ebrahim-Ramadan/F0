'use client';
import React, { useState, useEffect, useRef } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import dynamic from 'next/dynamic';
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
  <div className="absolute top-0 bg-gradient-to-b from-[#171717] to-transparent z-20 w-full h-16"></div>

  <div className="w-full flex-grow relative">
    <div className='absolute h-full flex flex-col justify-center items-center text-white z-20 w-full bg-primary-50 bg-opacity-20 backdrop-blur-xs px-4 md:px-8'>
<div className="w-full md:w-1/2 space-y-2 md:space-y-2 bg-primary-50 bg-opacity-20 backdrop-blur-2xl p-4 rounded-3xl ">
              <div className="inline-block rounded-lg transition-all duration-300 hover:bg-primary-200 bg-primary-100 px-3 py-1 text-xs items-center font-bold flex w-fit gap-1 flex-row">
                Inspired by 
                <svg fill="currentColor" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="size-5">
                  <path d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"></path>
                  <path d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"></path>
                </svg>
              </div>
              <h1 className="text-primary-800 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl ">
                Welcome to <span className="text-primary-950">F0</span>
              </h1>
              <p className="mt-2 text-primary-900 text-lg md:text-xl">
                The fastest cheapest Background removal service, Ever
              </p>
              <button className="mt-2 md:mt-4 flex justify-end w-full">
                <a href={loggedIN?`/images`:'/join'} className='px-5 py-2 md:px-8 md:py-3 bg-primary-900 text-lg md:text-xl text-black font-semibold rounded-3xl mt-4 hover:bg-primary-700 transition-all duration-300'>
                  {loggedIN ?
                'Try Now':
                'Sign Up'  
                }
                  </a>
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
          className="absolute bottom-16 right-6 z-30 p-2 bg-primary-100 backdrop-blur-lg rounded-full text-white hover:bg-opacity-75 transition-all duration-300"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </>
    )}
    <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-primary-50 to-transparent z-10"></div>
    <div className="absolute bottom-16 left-6  z-20 text-lg md:text-xl">
                  <SponserComponent/>
                </div>
  </div>
</div>

  );
};

export default VideoComponent;