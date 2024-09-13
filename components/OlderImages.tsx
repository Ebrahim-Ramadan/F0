'use client'
import { copyToClipboard } from '@/utils/utils';
import { Check, Copy } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

export const OlderImages = ({ user }) => {
  const [copiedId, setCopiedId] = useState(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleCopy = (id, url) => {
    copyToClipboard(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className='min-h-screen w-full '>
      {user.images.length > 0 && (
        <div className="relative my-8">
          <h1 className="relative ml-2 z-10 inline-block bg-black px-2 font-bold text-xl md:text-2xl text-white">Older Images</h1>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-600"></div>
          </div>
        </div>
      )}
      <div className="p-2 md:p-4 columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-4">
        {user.images.map((img, index) => (
          <div key={index} className="group break-inside-avoid rounded-lg transition-colors duration-300 py-2 relative group overflow-hidden rounded-lg border-2 border-primary-300 mb-4">
            <Image
              width={500}
              height={500}
              alt={`Processed Image ${index + 1}`}
              src={img.afterBgRemoval}
              className="object-cover w-full h-36 md:h-72 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="text-xs md:text-sm absolute top-2 right-2 bg-primary-200 backdrop-blur-3xl transition-opacity duration-300 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => handleCopy(img.id, img.afterBgRemoval)}
                className="flex items-center p-2 gap-2 text-xs md:text-sm"
              >
                {copiedId === img.id ? <Check size='16' /> : <Copy size='16' />}
              </button>
            </div>
            <div className="text-xs md:text-sm absolute bottom-0 flex flex-row justify-between w-full items-center bg-black/80 backdrop-blur-xl transition-opacity duration-300 rounded-md px-2 py-1">
              <p className={`text-primary-950`}>{'#'+img.id}</p>
              <p className='text-primary-700'>{img.processedAt && formatDate(img.processedAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}