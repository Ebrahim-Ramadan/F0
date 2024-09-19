'use client'
import { Heart } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

export const HeroSections = () => {
  const images = [
    { src: '/examples/2-no-bg.jpg', alt: 'Pitching', likes: 223 , defaultColor:'bg-blue-500'},
    { src: '/examples/9-no-bg.jpg', alt: 'Pitching', likes: 631 , defaultColor:'bg-purple-500'},
    { src: '/examples/3-no-bg.jpg', alt: 'Pitching', likes: 656 , defaultColor:'bg-blue-500'},
    { src: '/examples/4-no-bg.jpg', alt: 'Pitching', likes: 647 , defaultColor:'bg-purple-500'},
    { src: '/examples/6-no-bg.jpg', alt: 'Pitching', likes: 870 , defaultColor:'bg-yellow-500'},
    { src: '/examples/1-no-bg.webp', alt: 'Pitching', likes: 466 , defaultColor:'bg-yellow-500'},
    { src: '/examples/7-no-bg.jpg', alt: 'Pitching', likes: 214 , defaultColor:'bg-purple-500'},
  ];
  const [selectedColors, setSelectedColors] = React.useState(Array(images.length).fill(''));
  
  // Function to handle color selection
  const handleColorChange = (index: number, color: string) => {
    const updatedColors = [...selectedColors];
    updatedColors[index] = color;
    setSelectedColors(updatedColors);
  };

  const bgOptions = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
  ]

  return (
    <div className="md:p-4 columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className={`group break-inside-avoid rounded-lg transition-colors duration-500 py-2`}
        >
          <div className="flex flex-col relative">
            <Image
              className={`rounded-lg transition-all hover:bg-opacity-80 ${!selectedColors[index] && image.defaultColor} duration-500 ease-in-out ${selectedColors[index]}`}
              width={1000}
              height={1000}
              alt={image.alt}
              src={image.src}
            />
            
            <div className='absolute bottom-6 left-2 flex flex-row items-center gap-1'>
              <div className="flex justify-start gap-1 md:gap-2 ">
                {bgOptions.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className={`w-3 h-3 md:w-5 md:h-5 rounded-full cursor-pointer ${selectedColors[index] === color ? 'border-primary-900 scale-110': 'border-primary-500'} ${color} border-2 transition-all duration-500 ease-in-out`}
                    onClick={() => handleColorChange(index, color)}
                  />
                ))}
              </div>
            </div>
            <div className="mt-2 flex justify-end flex-row items-center gap-1 px-2">
              <span className="flex items-center backdrop-blur-3xl bg-white/20 rounded-full px-2 py-1 font-semibold text-[10px] md:text-sm text-primary-900">
                {image.likes}
                <Heart fill="#3B82F6" stroke="0" className="w-4" size='14' />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HeroSections