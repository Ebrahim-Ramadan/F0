'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { ArrowLeft } from 'lucide-react';


export const CMD = ({ cmd }) => {
    const lines = cmd.split('\n').map(line => line.trim());
    return (
        <div className="my-4 p-4 flex w-full items-center justify-center text-white bg-black/80 font-mono text-base rounded-md">
            <div className="flex flex-col gap-1 w-full max-w-full overflow-x-auto">
                {lines.map((line, index) => (
                    <div key={index} className="flex items-start gap-1 whitespace-pre-wrap break-words">
                        {line.startsWith('#') ? (
                            <span className="text-gray-400 w-full">{line.replace('#', '')}</span>
                        ) : (
                            <>
                                <span className="text-gray-200 flex-shrink-0">$</span>
                                <span className="w-full">{line}</span>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


export const BackToBlogs = () => {
    return (
        <div className='flex w-full'>
            <Link href='/' className='hover:bg-white/10 rounded-full p-2'>
        <ArrowLeft/>
         </Link>
        </div>
    )
}

export const HighLight = ({  text }) => {
    return (
        <span   className='px-2 py-1 font-bold text-blue-400 hover:text-blue-600 '>
            {text}
        </span>
    )
}

export const LinkComponent = ({ text , href}) => {
    return (
        <a href={href}  rel="noopener noreferrer" className=' mx-1 custom-underline font-medium'>
            {text}
        </a>
    )
}
export const Quote = ({ text }) => {
    return (
        <blockquote className="p-4 my-4 w-fit text-center border-s-4 border-gray-300 bg-white/10 ">
        <p className="text-base md:text-lg italic font-medium leading-relaxed text-slate-200">"{text}"</p>
    </blockquote>
    )
}
export const HeadingTitle = ({ text , ID}) => {
    return (
        <div className='w-fit p-2 px-2 text-start scroll-mt-12 scroll-smooth' id={ID}>
            
            <a href={`#${ID}`} className="hover:text-blue-400 text-lg md:text-2xl  font-bold "
           
            ># {text}
             
            </ a>
       </div>
    )
}
export const ListElement = ({ children}) => {
    return (
        <div className='px-2 py-1 font-medium'>
           {children}
       </div>
    )
}

export const BlogLinks = ({ links }) => {
    return (
        <div className='flex flex-row items-center justify-end'>
        {links.map((link, index) => (
            <div key={index}>
{link}
                </div>
        ))}
        </div>
    )
}



export const Badge = ({href, text}) => {
    return (
        <div className='p-2 '>
            <a href={href} target='_blank' rel='noopener noreferrer' className='px-2 py-1 font-medium w-fit rounded-full border border-white/10 bg-blue-400 text-xs'>
        
        {text}
         
       </a>
      </div>
    );
  };
  
export const BlogHeader = ({title, desc, imgPath}) => { 
    return (
        <div className='flex flex-col gap-6'>
             <BackToBlogs/>
        <div className=' relative'>
            {/* <Image
                width={1000}
                className='rounded-lg inset-0 object-cover w-full'
                height={500}
            src={imgPath}
            /> */}
            F0
            <div className='absolute w-full h-full bottom-0 bg-gradient-to-t from-black/10 to-transparent'>
                
            </div>
            <div className='hidden md:block absolute bottom-4 left-4'>
                    <h1 class="text-lg md:text-2xl font-medium ">{title}</h1>
                    <p class="text-xs md:text-sm text-gray-200 px-2 ">{desc}</p>
       </div>
        </div>
        <div className='block md:hidden px-2'>
                <h1 class="text-lg md:text-2xl font-medium ">{title}</h1>
                <p class="text-xs md:text-sm text-gray-200 px-2 ">{desc}</p>
        </div>
       </div>
)
}