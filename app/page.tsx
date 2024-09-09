import React from 'react';
import dynamic from 'next/dynamic';


const DynamicVideoComponent = dynamic(() => import('@/components/VideoComponent'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen  w-full flex mx-auto flex-col items-center justify-center">
      <DynamicVideoComponent />
    </div>
  );
}