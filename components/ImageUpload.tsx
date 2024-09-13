  'use client'
  import {  copyToClipboard } from '@/utils/utils';
  // import { copyToClipboard } from '@/utils/utils';
  import { Bookmark, Check, Copy, Folder, Upload } from 'lucide-react';
  import Image from 'next/image';
  import React from 'react';
  import LoadingDots from './Globals/LoadingDots';

  export const ImageUpload = ({user}) => {
    
    const [processedImages, setProcessedImages] = React.useState([]);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [draggedState, setDraggedState] = React.useState<boolean>(false);
    const [copiedId, setCopiedId] = React.useState<string | null>(null);
    
    const handleFileUpload = async (file: File) => {
      setIsProcessing(true);
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await fetch('http://localhost:3000/remove-bg', {
          method: 'POST',
          body: formData 
        });
  
        if (!response.ok) {
          throw new Error('Failed to remove background');
        }
    
        const blob = await response.blob(); 
        const imageUrl = URL.createObjectURL(blob);
        
        // Add the processed image to the state immediately
        const newImageIndex = processedImages.length;
        setProcessedImages(prev => [...prev, { afterBgRemoval: imageUrl, isUploading: true }]);
        
        // Upload the image to the server in the background
        uploadImageToServer(blob, newImageIndex);
        
      } catch (err) {
        console.error('Error processing image:', err);
        setError('Failed to process image');
      } finally {
        setIsProcessing(false);
      }
    };
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString();
    };
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setDraggedState(false); // Reset dragging state
      if (event.dataTransfer.files) {
        handleFileUpload(event.dataTransfer.files[0]);
      }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      setDraggedState(true); // Set dragging state
      event.preventDefault();
      event.stopPropagation();
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
      setDraggedState(false); // Reset dragging state
      event.preventDefault();
      event.stopPropagation();
    };

    const uploadImageToServer = async (blob: Blob, index: number) => {
      try {
        const res = await fetch("/api/uploadImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: await blobToBase64(blob),
            userId: user.id
          }),
        });
  
        if (!res.ok) {
          throw new Error('Failed to upload image');
        }
  
        const result = await res.json();
        console.log('Upload result:', result.newImageCreated[0]);
        
        // Update the image info in the state with the server response
        setProcessedImages(prev => prev.map((img, i) => 
          i === index ? { ...result.newImageCreated[0], isUploading: false } : img
        ));
      } catch (err) {
        console.error('Error uploading image:', err);
        // Update the state to reflect the upload failure
        setProcessedImages(prev => prev.map((img, i) => 
          i === index ? { ...img, isUploading: false, uploadError: true } : img
        ));
      }
    };
    
    if (error) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl mb-2">ERROR</h2>
            <p>{error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className=' flex flex-col items-center justify-center h-1/2 w-full'>
        <div className="mb-8 w-full border-gray-700 flex flex-col items-center justify-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        >
        {isProcessing ?
              <div className={`flex flex-col items-center justify-center md:w-1/2 w-full h-64 border-2  border-dashed rounded-lg cursor-pointer bg-black/70 hover:bg-black/90 transition-all duration-300 `}>
                <LoadingDots />
              </div>
              :
              <label
              
                htmlFor="dropzone-file"
                className={`bg-black/80 flex flex-col items-center justify-center md:w-1/2 w-full h-64 border-2  border-dashed rounded-lg cursor-pointer  transition-all duration-300 ${draggedState ? 'border-blue-500' : 'border-neutral-600'}`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className={`w-10 h-10 mb-3 text-gray-400 transition duration-300 ${draggedState && 'scale-110 text-gray-300 '}`} />
                  <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                  accept="image/*"
                  disabled={isProcessing}
                />
              </label>
            }
        </div>
        <div className="border-gray-700 w-full">

        
            {processedImages.length>0 &&
             <div className='flex justify-end w-full'>
             <button className='flex flex-row items-center gap-1 bg-primary-200 hover:bg-primary-300 rounded-3xl px-2 py-1'>
               <Bookmark size='14'/>
               Create Collection
             </button>
             </div> }
            {processedImages.length>0 &&
              <div className="relative my-8">
              <h1 className="relative ml-2 z-10 inline-block bg-black px-2 font-bold text-xl md:text-2xl text-white">New Images</h1>
                <div className="absolute inset-0 flex items-center ">
                  <div className="w-full border-t border-neutral-600 "></div>
                </div>
            </div>}


          <div>
            <div className="p-2 md:p-4 columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-4">
            {processedImages.map((img, index) => (
              <div key={index} className="group break-inside-avoid rounded-lg transition-colors duration-300 py-2 relative group overflow-hidden rounded-lg border-2 border-primary-300">
                <Image
                  width={500}
                  height={500}
                  alt={`Processed Image ${index + 1}`}
                  src={img.afterBgRemoval}
                  className="object-cover w-full h-36 md:h-72 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="text-xs md:text-sm absolute top-2 right-2 bg-primary-200 backdrop-blur-3xl  transition-opacity duration-300 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => {
                      copyToClipboard(img.afterBgRemoval);
                      setCopiedId(img.id || index.toString());
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="flex items-center p-2 gap-2 text-xs md:text-sm "
                  >
                    {copiedId === (img.id || index.toString()) ? <Check size='16' /> : <Copy size='16' />}
                  </button>
                </div>
                <div className="text-xs md:text-sm absolute bottom-0 flex flex-row justify-between w-full items-center  bg-black/80 backdrop-blur-xl  transition-opacity duration-300 items-start justify-center rounded-md px-2 py-1">
                  <p className={`${img.isUploading ? 'text-yellow-400':'text-primary-950'}`}> {img.isUploading ?'Uploading...' :'#'+img.id}</p>
                  <p className='text-primary-700'>{img.processedAt && formatDate(img.processedAt)}</p>
                  {img.uploadError && <p className="text-red-400">Upload failed</p>}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };