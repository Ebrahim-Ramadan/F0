'use client'
import { CheckIcon, XIcon } from "lucide-react"
import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import Link from "next/link"

export const Plans = ({triggerClassName, triggerText}: {triggerClassName: string, triggerText: string}) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <>
        <div className={`flex justify-end ${triggerText == 'Manage Account' ? 'w-full' : ''}`}>
        <button
        className={`font-bold text-center   ${triggerClassName}`}
        role="Subscribe"
        id="manage-account"
          onClick={() => setIsOpen(true)}
        >
       {triggerText}
        </button>
        
        </div>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={`fixed inset-0 flex justify-center items-center z-50 px-2 ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
          <div  className={`fixed inset-0 bg-gradient-to-b from-black/40 to-black ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}aria-hidden="true" onClick={() => setIsOpen(false)}/>
          <div className={`relative overflow-y-scroll h-auto md:max-h-[90vh] max-h-[80vh] w-full md:max-w-3xl bg-black/40 backdrop-blur-3xl grid gap-8 max-w-7xl mx-auto py-4 md:py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border-2 border-primary-100 ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
          
          <div className="grid gap-2 w-full">
          <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-3xl font-bold tracking-tight">Subscription Plan</h1>
                  <button onClick={() => setIsOpen(false)} className='rounded-full bg-primary-300 hover:bg-primary-400 w-6 md:w-8 h-6 md:h-8 flex items-center justify-center'>
                  <XIcon className="w-4 md:w-6 h-4 md:h-6"/>
              </button>
          </div>
              <p className="text-sm text-primary-800">Choose the plan that best suits your background removal needs.</p>
            </div>

            <div className="grid gap-6 [&>*]:transition [&>*]:duration-300 [&>*]:p-4 [&>*]:rounded-3xl">
              <div className="bg-primary-200">
                <div>
                  <p className="text-2xl md:text-3xl font-semibold">Go nuts Plan</p>
                  <p className="text-sm text-primary-800">150 images per month</p>
                </div>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between py-2">
                    <div className="text-3xl md:text-4xl font-bold">EGP 90.00</div>
                    <div className="text-muted-foreground">/month</div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-neutral-500" />
                      <span>Batch background removal for up to 150 images</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-neutral-500" />
                      <span>No restrictions or commercial shit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-neutral-500" />
                      <span>Monthly payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-neutral-500" />
                      <span>Premium image quality</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-neutral-500" />
                      <span>Email, chat, and phone support</span>
                    </div>
                  </div>
                </div>
                <Link href='/payment' onClick={() => setIsOpen(false)} className="mt-4 bg-neutral-100 text-center block px-4 py-2 text-sm md:text-base rounded-3xl hover:bg-neutral-200 text-black font-semibold w-full">
                  Subscribe
                </Link>
              </div>
              <div className="">
                <div>
                  <p className="text-xs px-2 py-1 bg-primary-200 rounded-full w-fit">Founder Mode?</p>
                </div>
                <div className="grid gap-6">
                  <div>
                    <div className="text-4xl font-bold">Contact Us</div>
                    <p className="text-sm text-primary-900">Tailored to your needs</p>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-neutral-500" />
                      <span>Customized background removal solution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-neutral-500" />
                      <span>Dedicated account manager</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-neutral-500" />
                      <span>Enterprise-level support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-neutral-500" />
                      <span>Tailored pricing</span>
                    </div>
                  </div>
                </div>
                <button className="mt-4 bg-neutral-100 text-center block px-4 py-2 text-sm md:text-base rounded-3xl hover:bg-neutral-200 text-black font-semibold w-full">
                  Contact The Founder
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </>
    );
}
export default Plans;