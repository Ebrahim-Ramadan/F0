import { Plus } from 'lucide-react'
import React from 'react'

export const Bento = () => {
  return (
<div className="min-h-screen px-2 md:px-8 relative">
{/* <Plus strokeWidth='1' className="z-40 absolute top-2 left-4 md:left-8 text-white opacity-60" size={20} /> */}
      <Plus strokeWidth='1' className="z-40 absolute top-2 right-4 md:right-8 text-white opacity-60" size={20} />
      {/* <Plus strokeWidth='1' className="z-40 absolute bottom-2 left-4 md:left-8 text-white opacity-60" size={20} /> */}
      {/* <Plus strokeWidth='1' className="z-40 absolute bottom-2 right-4 md:right-8 text-white opacity-60" size={20} /> */}
    <h2 className="text-3xl text-darkgray undefined">Spaces</h2>
    <div className="grid sm:grid-cols-2 gap-8 mt-8 sm:h-[32rem] h-full">
        <div className="grid sm:grid-rows-2 gap-8 h-full">
<div className="bg-[#f5f5f5] rounded-[24px] overflow-hidden relative cursor-pointer sm:h-full h-[16rem]">
    <div className="relative z-10 p-8 grid justify-between">
        <h3 className="text-xl font-bold text-darkgray mb-2 text-white ">Limitless</h3>
    </div>
    <img alt="ipad" loading="lazy" width="5548" height="2520" decoding="async" data-nimg="1" className="transparent h-full inset-0 absolute z-0 object-cover undefined"  src='/bento/bento-01.jpg'/>
    </div>
<div className="grid sm:grid-cols-2 gap-8">
    <div className="bg-[#f5f5f5] rounded-[24px] overflow-hidden relative cursor-pointer undefined">
        <div className="relative z-10 p-8 grid justify-between">
            <h3 className="text-xl font-bold text-darkgray mb-2 text-white ">AI ENHANCED</h3>
            <h2 className="text-3xl text-darkgray p-8 bg-foregroundGray rounded-xl w-max max-w-2xl mt-8 m-0">Next time I'm in Sausalito, I need to go to the pizza place</h2><h3 className="text-xl font-medium text-darkgray mt-2 text-white w-full"></h3>
        </div>
        <img alt="ipad" loading="lazy" width="1248" height="1160" decoding="async" data-nimg="1" className="transparent h-full inset-0 absolute z-0 object-cover undefined"  src='/bento/bento-03.jpg'/>
    </div>
    <div className="bg-[#f5f5f5] rounded-[24px] overflow-hidden relative cursor-pointer relative sm:h-full h-[16rem]">
        <div className="relative z-10 p-8 grid justify-between">
            <h3 className="text-xl font-bold text-darkgray mb-2 false">FAST</h3>
            <img alt="Integrations" loading="lazy" width="800" height="700" decoding="async" data-nimg="1" className="-z-20 mb-2 w-full absolute -bottom-60"  src='/bento/bento-02.jpg'/><h3 className="text-xl font-medium text-darkgray mt-2 false w-full"></h3>
        </div>
    </div>
</div>
    
        </div>

        <div className="bg-primary-50 rounded-[24px] overflow-hidden relative cursor-pointer relative">
<div className="relative z-10 p-8 grid justify-between">
    <h3 className="text-xl font-bold text-darkgray mb-2 text-white">FOCUSED</h3>
    <img alt="focus" loading="lazy" width="599" height="598" decoding="async" data-nimg="1" className="rounded-[24px] mb-4 w-full absolute transparent -right-32 top-16"  src='/bento/bento-05.jpeg'/>
    <h3 className="text-xl font-medium text-darkgray text-white relative top-[430px] ">F0 forces you to focus on the thing you want to get done</h3><h3 className="text-xl font-medium text-darkgray mt-2 text-white w-full"></h3>
</div>
<div className="inset-0 absolute z-0 h-full w-full bg-gradient-to-t from-[#0F0D18] to-[#1B162B]"></div>
        </div>
    </div>
</div>
    
  )
}
