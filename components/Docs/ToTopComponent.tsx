'use client'
import { ArrowUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export const ToTopComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // This useEffect runs on the client side to check the scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true); // Show button if scrolled more than 300px
      } else {
        setIsVisible(false); // Hide button otherwise
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`flex justify-end fixed bottom-8 w-full right-2 px-4 z-50 md:px-12 transition duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <button
        onClick={handleScrollToTop} 
        className='rounded-full flex backdrop-blur-3xl justify-center items-center bg-primary-300/50 hover:bg-primary-300 w-8 h-8'
      >
        <ArrowUp size='16' />
      </button>
    </div>
  )
}
