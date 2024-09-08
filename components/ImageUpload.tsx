'use client'
import { copyToClipboard } from '@/utils/utils';
import { Copy, Upload } from 'lucide-react';
import React from 'react'

export const ImageUpload = () => {
    // const data = useLoaderData<typeof loader>();
    const [processedImages, setProcessedImages] = React.useState<string[]>([]);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
  
    // const handleDelete = async (id: string) => {
    //   try {
    //     await deleteImage({ id, userId: data.userID });
    //     // Refresh the image list after deletion if necessary
    //   } catch (error) {
    //     console.error('Error deleting image:', error);
    //   }
    // };
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
          const file = event.target.files[0];
          console.log('file', file);
          setIsProcessing(true);
          const startTime = performance.now();
          try {
              const formData = new FormData();
              formData.append('image', file);
              
              const result = await fetch('/api/process-image', {
                  method: 'POST',
                  body: formData,
              });
              
              const resultJson = await result.json();
              console.log('result', resultJson);
              
              if (resultJson.error) {
                  throw new Error(resultJson.error);
              }
              
              // Create object URLs from base64 data
              const regularBlob = base64ToBlob(resultJson.regular, 'image/webp');
              const trimmedBlob = base64ToBlob(resultJson.trimmed, 'image/webp');
              
              const regularUrl = URL.createObjectURL(regularBlob);
              const trimmedUrl = URL.createObjectURL(trimmedBlob);
              
              setProcessedImages(prev => [...prev, regularUrl, trimmedUrl]);
          } catch (err) {
              console.error('Error removing background:', err);
              setError('Failed to remove background');
          } finally {
              const endTime = performance.now();
              console.log(`Time spent: ${endTime - startTime}ms`);
              setIsProcessing(false);
          }
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
   <div className='flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
     <div className="mb-8  border-gray-700">
    <div>
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-black/70 hover:bg-black/90 transition-all duration-300">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload} accept="image/*" disabled={isProcessing} />
        </label>
      </div>
    </div>
  </div>
   <div className=" border-gray-700">
   <div>
     <div>Processed Images</div>
   </div>
   <div>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       {processedImages.map((src, index) => (
         <div key={index} className="relative group overflow-hidden rounded-lg">
           <img
             src={src}
             alt={`Processed Image ${index + 1}`}
             className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
           />
           <div className="absolute top-0 right-0 bg-black/40 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <button
               onClick={() => copyToClipboard(src)}
               className="flex items-center"
             >
               <Copy className="w-4 h-4 mr-2" />
               Copy
             </button>
           </div>
         </div>
       ))}
     </div>
   </div>
 </div>
   </div>
  )
}

  // Helper function to convert base64 to Blob
  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteChars = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
};