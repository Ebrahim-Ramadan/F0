import React from 'react';
import dynamic from 'next/dynamic';
import SponserComponent from "@/components/SponserComponent";
import Image from "next/image";

const DynamicVideoComponent = dynamic(() => import('@/components/VideoComponent'), {
  // ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen  w-full flex mx-auto flex-col items-center justify-center">
      <DynamicVideoComponent />

    
    </div>
  );
}