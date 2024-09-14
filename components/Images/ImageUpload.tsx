'use client';

import { copyToClipboard } from '@/utils/utils';
import { Bookmark, Check, Copy, Upload, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import LoadingDots from '../Globals/LoadingDots';
import Plans from '../payment/Plans';

interface User {
  id: string;
  paymentDate?: string;
}

interface ProcessedImage {
  id: string;
  afterBgRemoval?: string;
  isUploading: boolean;
  processedAt?: string;
  uploadError?: boolean;
}

export const ImageUpload: React.FC<{ user: User }> = ({ user }) => {
  const PaidUser = user.paymentDate ? true : false;
  const router = useRouter();
  const [processedImages, setProcessedImages] = React.useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [draggedState, setDraggedState] = React.useState<boolean>(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [UpgradeShow, setUpgradeShow] = React.useState<boolean >(true);

  const handleFileUpload = async (files: FileList) => {
    setIsProcessing(true);
    setError(null);
    const filesArray = Array.from(files);
// @ts-ignore
    for (const [index, file] of filesArray.entries()) {
      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('http://localhost:3000/remove-bg', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        // Add a unique id to the image object
        const newImage: ProcessedImage = { 
          id: `img_${Date.now()}_${index}`, 
          afterBgRemoval: imageUrl, 
          isUploading: true 
        };

        setProcessedImages(prev => [...prev, newImage]);
        setIsProcessing(false);

        await uploadImageToServer(blob, index);
        router.refresh();
        setProcessedImages(prev => 
          prev.map(img => 
            img.id === newImage.id ? { ...img, isUploading: false } : img
          )
        );

      } catch (err) {
        console.error('Error processing image:', err);
        setError(`Failed to process image ${index + 1}: ${(err as Error).message}`);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDraggedState(false); // Reset dragging state
  if(PaidUser){
    toast.info('All Images are being uploaded');
  }
  else {
toast.info('Only One Image is being uploaded, Upgrade to Upload Multiple Images at once');
  }
    if (event.dataTransfer.files) {
      const files = PaidUser 
        ? event.dataTransfer.files 
        : [event.dataTransfer.files[0]]; // Wrap the single file in an array for unpaid users
      handleFileUpload(files);
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
      console.log('Upload result:', result);

      // Update the image info in the state with the server response
      setProcessedImages(prev => prev.map((img, i) => 
        i === index ? { ...img, ...result.newImageCreated[0], isUploading: false } : img
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
      <div className="min-h-screen  text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl mb-2">ERROR</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center h-1/2 w-full'>
      <div className="mb-8 w-full border-gray-700 flex flex-col items-center justify-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isProcessing ? (
          <div className={`flex flex-col items-center justify-center md:w-1/2 w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-black/70 hover:bg-black/90 transition-all duration-300`}>
            <LoadingDots />
          </div>
        ) : (
          <label
            htmlFor="dropzone-file"
            className={`bg-black/80 flex flex-col items-center justify-center md:w-1/2 w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${draggedState ? 'border-blue-500' : 'border-neutral-600'}`}
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
              onChange={(e) => e.target.files && handleFileUpload(PaidUser? e.target.files : e.target.files[0])}
              accept="image/*"
              multiple={PaidUser}
              disabled={isProcessing}
            />
          </label>
        )}
       {UpgradeShow && !PaidUser && (
  <div className={`flex items-center justify-between px-3 py-1.5 text-xs text-primary-800 md:text-sm relative rounded-b-xl bg-primary-100 md:w-1/2 w-full transition duration-300 h-fit ${UpgradeShow ? '' : 'h-0'}`}>
    <span className="flex w-full justify-between pr-1">
      Subscribe for more than 1 image per time. 
      <Plans
        triggerClassName="disabled:border-primary-300 border-primary-400 hover:border-primary-400 focus-visible:ring-offset-background inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap text-nowrap border outline-none ring-blue-600 transition-all focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-primary-100 disabled:text-primary-400 disabled:ring-0 has-[:focus-visible]:ring-2 [&>svg]:pointer-events-none [&>svg]:size-4 [&_svg]:shrink-0 !h-auto border-none bg-transparent !p-0 text-blue-600 hover:border-none hover:bg-transparent hover:underline hover:underline-offset-2 focus:border-primary-100 focus:bg-transparent focus-visible:border-primary-100 focus-visible:bg-transparent px-3 has-[>kbd]:gap-2 has-[>svg]:px-2 has-[>kbd]:pr-[6px] rounded-lg h-5 text-xs md:text-sm"
        triggerText="Upgrade Plan"
      />
    </span>
    <button
      onClick={() => setUpgradeShow(false)}
      className="focus-visible:ring-offset-background inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap text-nowrap border font-medium outline-none ring-blue-600 transition-all focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:ring-0 has-[:focus-visible]:ring-2 [&>svg]:pointer-events-none [&>svg]:size-4 [&_svg]:shrink-0 hover:bg-primary-300 focus:bg-primary-200 focus-visible:bg-primary-200 border-transparent bg-transparent hover:border-transparent focus:border-transparent focus-visible:border-transparent disabled:border-transparent disabled:bg-transparent disabled:text-gray-400 text-sm has-[>kbd]:gap-3 has-[>kbd]:pr-[6px] rounded-full aspect-square h-5 px-0 text-gray-500 has-[>svg]:px-0"
      aria-label="Close"
    >
      <XIcon/>
    </button>
  </div>
)}

       
      </div>
      <div className="border-gray-700 w-full">
        {processedImages.length > 0 && (
          <div className='flex justify-end w-full'>
            <button className='flex flex-row items-center gap-1 bg-primary-200 hover:bg-primary-300 rounded-3xl px-2 py-1'>
              <Bookmark size='14'/>
              Create Collection
            </button>
          </div>
        )}
        {processedImages.length > 0 && (
          <div className="relative my-8">
            <h1 className="relative ml-2 z-10 inline-block bg-black px-2 font-bold text-xl md:text-2xl text-white">NEW IMAGES</h1>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-600"></div>
            </div>
          </div>
        )}
        <div>
          <div className="p-2 md:p-4 columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-4">
            {processedImages.map((img, index) => (
              <div key={img.id || index} className="group break-inside-avoid rounded-lg transition-colors duration-300 py-2 relative group overflow-hidden rounded-lg border-2 border-primary-400">
                {img.afterBgRemoval && (
                  <Image
                    width={500}
                    height={500}
                    alt={`Processed Image ${index + 1}`}
                    src={img.afterBgRemoval}
                    className="object-cover w-full h-36 md:h-72 transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                <div className="text-xs md:text-sm absolute top-2 right-2 bg-primary-200 backdrop-blur-3xl transition-opacity duration-300 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => {
                      copyToClipboard(img.afterBgRemoval || '');
                      setCopiedId(img.id || index.toString());
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="flex items-center p-2 gap-2 text-xs md:text-sm "
                  >
                    {copiedId === (img.id || index.toString()) ? <Check size='16' /> : <Copy size='16' />}
                  </button>
                </div>
                <div className="text-xs md:text-sm absolute bottom-2 left-2 text-white">
                  {img.processedAt && formatDate(img.processedAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert Blob to Base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
