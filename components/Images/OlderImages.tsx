'use client'
import { copyToClipboard } from '@/utils/utils';
import { Check, Copy, Trash2, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useDeferredValue, useEffect, useState } from 'react'
import { toast } from 'sonner';
import LoadingDots from '../Globals/LoadingDots';
import Tags from './Tags';


const deleteImage = async (id) => {
  try {
    const response = await fetch('/api/delete-image', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete image');
    }

    return response.json(); 
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

export const OlderImages = ({ user }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  
  const router = useRouter();
  const [copiedId, setCopiedId] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [tags, settags] = useState([]);
  const deferredImagesSelected = useDeferredValue(selectedImages)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };


  const handleCopy = (id, url) => {
    copyToClipboard(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCheckboxChange = (id) => {
    setSelectedImages(prev => 
      prev.includes(id) ? prev.filter(imageId => imageId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
   setLoading(true);
    
    const deletePromises = selectedImages.map(id => deleteImage(id));

    const racePromise = new Promise((resolve, reject) => {
      Promise.race(deletePromises)
        .then(() => resolve('Some images deleted'))
        .catch(error => reject(error));
    });

    try {
      await racePromise;
      toast.success('Deleted');
      router.refresh();
    } catch (error) {
      console.error('Error deleting images:', error);
    } finally {
   setLoading(false);
      setSelectedImages([]);
    }
  };

  const handleSelectAll = () => {
    if (selectedImages.length === user.images.length) {
      // If all images are selected, deselect them
      setSelectedImages([]);
    } else {
      // Select all images
      setSelectedImages(user.images.map(img => img.id));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'a') {
        event.preventDefault(); // Prevent default browser select-all behavior
        handleSelectAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImages, user.images]);


  
  useEffect(() => {
    const tags = localStorage.getItem('tags') ? JSON.parse(localStorage.getItem('tags')) : [];  
    settags(tags); 
  }, []);
  const handleTagsUpdate = (updatedTags) => {
    settags(updatedTags); // Update local state with the latest tags
};

  useEffect(() => {
    const queryTags = new URLSearchParams(window.location.search).get('tags');
    if (queryTags) {
      setSelectedTags(queryTags.split(','));
    }
  }, []);

  const handleTagClick = (tag) => {
    console.log('selectedTags', selectedTags);
    
    let newSelectedTags;
    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter(t => t !== tag);
    } else {
      newSelectedTags = [...selectedTags, tag];
    }

    const newUrl = `/images?tags=${encodeURIComponent(newSelectedTags.join(','))}`;
    
    router.push(newUrl,  { scroll: false });
    setSelectedTags(newSelectedTags);
  };
  const tagToImageIdsMap = tags.reduce((acc, tagObj) => {
    for (const [tag, ids] of Object.entries(tagObj)) {
      acc[tag] = ids;
    }
    return acc;
  }, {});
  
  const filterImagesByTags = (images, selectedTags) => {
    if (selectedTags.length === 0) {
      return images; // If no tags are selected, return all images
    }
  
    const filteredImageIds = new Set(
      selectedTags.flatMap(tag => tagToImageIdsMap[tag] || [])
    );
  
    return images.filter(image => filteredImageIds.has(image.id));
  };
  const filteredImages = filterImagesByTags(user.images, selectedTags);
  return (

    <div className='min-h-screen w-full '>
      {user.images.length > 0 && (
        <div className="relative my-2 md:my-8">
          <h1 className="relative ml-2 z-10 inline-block bg-black px-2 font-bold text-xl md:text-2xl text-white">Older Images</h1>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-600"></div>
          </div>
        </div>
      )}
      {user.images.length > 0 && 
        <div className="items-center mb-4 flex justify-between md:px-2 md:px-4 w-full gap-2">
         
          <p className='text-xs md:text-sm text-primary-900'>
          {selectedImages.length > 0 &&
          <>
          ({selectedImages.length})
          </>
          }
          </p>
    <div className='flex flex-row items-center gap-2'>
    <Tags selectedImageIds={deferredImagesSelected} onTagsUpdate={handleTagsUpdate}/>

        <button 
          className={`items-center gap-1 flex flex-row  ${!Loading ?'bg-red-600 hover:bg-red-700 ':'bg-transparent'} p-2 rounded-full text-xs md:text-sm md:font-semibold disabled:bg-primary-100`} 
          onClick={handleDeleteSelected}
          disabled={selectedImages.length === 0}
        >
        {Loading?
        <LoadingDots/>      
        :
        <>
        <Trash2 size='12' /> Delete </>
        }
        </button>
  </div>

      </div>
}
<div className='flex overflow-x-scroll w-full gap-2 md:px-2'>
{Array.from(new Set(tags.flatMap(obj => Object.keys(obj)))).map(tag => (
  <div key={tag} className='cursor-pointer flex flex-row items-center gap-2 relative'>
    <div
    className='absolute top-0 right-0 w-fit p-0.5 hover:bg-primary-400 border-primary-400 border h-fit bg-primary-300 rounded-full'
    >
    <XIcon size='12' className=''/>  
    </div>
    <p
  className={`px-4 py-2   border-2 rounded-full border-primary-300 text-sm font-medium ${selectedTags.includes(tag) ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-primary-200 text-primary-900 hover:bg-primary-300'}`}
          
          onClick={() => handleTagClick(tag)}>{tag}</p>
  </div>
))}
</div>
      <div className="py-2 md:p-4 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {filteredImages.map((img, index) => (
          <div key={index} className={`group break-inside-avoid rounded-lg transition-colors duration-300 py-2 relative group overflow-hidden rounded-lg border-2  mb-4 ${selectedImages.includes(img.id) ? 'border-primary-500' :'border-primary-300'}`}>
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
            <div
              className="bottombar text-xs md:text-sm absolute bottom-0 flex flex-row justify-between w-full items-center bg-black/80 backdrop-blur-xl transition-opacity duration-300 rounded-md md:px-2 py-1"
            >
              <input
                className='w-5 h-5 '
                type="checkbox"
                id={img.id}
                checked={selectedImages.includes(img.id)}
                onChange={() => handleCheckboxChange(img.id)}
              />
              <p className={`text-primary-950`}>{'#'+img.id}</p>
              <p className='text-primary-700'>{img.processedAt && formatDate(img.processedAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}