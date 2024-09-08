'use client'
import { copyToClipboard } from '@/utils/utils';
import { Copy, Upload } from 'lucide-react';
import React from 'react';
import LoadingDots from './LoadingDots';

export const ImageUpload = () => {
  const [processedImages, setProcessedImages] = React.useState<string[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [draggedState, setDraggedState] = React.useState<boolean>(false);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      const image = await preprocessImage(file);
      const response = await fetch('http://localhost:3000/remove-bg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image }) // Send base64 image as JSON
      });

      const resultJson = await response.json();
      console.log('resultJson', resultJson);

      if (resultJson.error) {
        throw new Error(resultJson.error);
      }

      setProcessedImages(prev => [...prev, resultJson.image]);
    } catch (err) {
      console.error('Error removing background:', err);
      setError('Failed to remove background');
    } finally {
      setIsProcessing(false);
    }
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
      <div className="mb-8 w-full border-gray-700 flex flex-col items-center justify-center">
      {isProcessing ?
            <div className={`flex flex-col items-center justify-center md:w-1/2 w-full h-64 border-2  border-dashed rounded-lg cursor-pointer bg-black/70 hover:bg-black/90 transition-all duration-300 `}>
              <LoadingDots />
            </div>
            :
            <label
            onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center md:w-1/2 w-full h-64 border-2  border-dashed rounded-lg cursor-pointer bg-black/70 hover:bg-black/90 transition-all duration-300 ${draggedState ? 'border-blue-500' : 'border-gray-600'}`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
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
        {processedImages.length > 0 &&
          <div>Processed Images</div>
        }
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {processedImages.map((src, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img
                  src={src}
                  alt={`Processed Image ${index + 1}`}
                  className="object-cover w-full h-36 md:h-72 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="text-xs md:text-sm absolute top-2 right-2 bg-black/80 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
                  <button
                    onClick={() => copyToClipboard(src)}
                    className="flex items-center px-2 py-1 gap-2"
                  >
                    <Copy size='16' />
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const preprocessImage = (selectedFile: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      if (imageData) {
        const base64Image = imageData.replace(/^data:image\/[a-z]+;base64,/, ''); // Remove the prefix
        resolve(`data:image/${selectedFile.type.split('/')[1]};base64,${base64Image}`);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(selectedFile); // Read file as Data URL
  });
};
