'use client'
import { CheckIcon, XIcon } from "lucide-react"
import { Dialog } from '@headlessui/react'
import { useState } from 'react'
interface PlansProps {
  triggerClassName: string;
  triggerText: string | React.ReactNode; // Update the type here
}

export const Plans:React.FC<PlansProps> = ({triggerClassName, triggerText}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <div className={`flex justify-end ${triggerText == 'Manage Account' &&'w-full' } ${triggerText == 'Upgrade Plan' &&'px-2' }`}>
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
          <div  className={`fixed inset-0 bg-gradient-to-b from-black/80 to-black ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}aria-hidden="true" onClick={() => setIsOpen(false)}/>
          <div className={`relative overflow-y-scroll h-auto md:max-h-[90vh] max-h-[85vh] w-full md:max-w-3xl bg-primary-300/50 backdrop-blur-3xl grid gap-8 max-w-7xl mx-auto py-4 md:py-12 px-4 sm:px-6 lg:px-8 rounded-3xl  ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
          
          <div className="grid gap-2 w-full">
          <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-3xl font-bold tracking-tight">Subscription Plans</h1>
                  <button onClick={() => setIsOpen(false)} className='rounded-full bg-primary-300 hover:bg-primary-400 w-6 md:w-8 h-6 md:h-8 flex items-center justify-center'>
                  <XIcon className="w-4 md:w-6 h-4 md:h-6"/>
              </button>
          </div>
              <p className="text-sm md:text-base text-primary-800">Choose the plan that best suits your background removal needs.</p>
            </div>

            <div className="grid gap-6 [&>*]:transition [&>*]:duration-300 [&>*]:p-4 [&>*]:rounded-3xl">
              <div className="bg-primary-300/50">
                <div>
                  <p className="text-2xl md:text-3xl font-semibold">Hoppy Plan</p>
                  <p className="text-sm md:text-base mt-1 text-primary-800">150 images per month</p>
                </div>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between py-2">
                    <div className="text-3xl md:text-4xl font-bold">EGP 90</div>
                    <div className="text-muted-foreground">/month</div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <CheckIcon className=" text-neutral-500" size='16' />
                      <span>Batch background removal for up to 150 images</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className=" text-neutral-500" size='16' />
                      <span>No restrictions or commercial shit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className=" text-neutral-500" size='16' />
                      <span>Monthly payment</span>
                    </div>
                   
                  </div>
                </div>
                <a href='/payment?plan=Hoppy' onClick={() => setIsOpen(false)} className="mt-4 bg-neutral-100 text-center block px-4 py-2 text-base md:text-lg rounded-3xl hover:bg-neutral-200 text-black font-bold w-full">
                  Subscribe Now
                </a>
              </div>
              <div className="bg-primary-300/50">
                <div>
                  <p className="text-2xl md:text-3xl font-semibold">Go nuts Plan</p>
                  <p className="text-sm md:text-base mt-1 text-primary-800">300 images per month</p>
                </div>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between py-2">
                    <div className="text-3xl md:text-4xl font-bold">EGP 135</div>
                    <div className="text-muted-foreground">/month</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CheckIcon className=" text-neutral-500" size='16' />
                      <span>Batch background removal for up to 300 images</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className=" text-neutral-500" size='16' />
                      <span>No restrictions or commercial shit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className=" text-neutral-500" size='16' />
                      <span>Monthly payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className=" text-neutral-500" size='16' />
                      <span>Premium image quality</span>
                    </div>
                   
                  </div>
                </div>
                <a href='/payment?plan=GoNuts' onClick={() => setIsOpen(false)} className="mt-4 bg-neutral-100 text-center block px-4 py-2 text-base md:text-lg rounded-3xl hover:bg-neutral-200 text-black font-bold w-full">
                  Subscribe Now
                </a>
              </div>
              <div className="bg-primary-300/50">
                <div>
                  <p className="text-2xl md:text-3xl font-semibold">Go super nuts Plan</p>
                  <p className="text-sm md:text-base mt-1 text-primary-800">unlimited images</p>
                </div>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between py-2">
                    <div className="text-3xl md:text-4xl font-bold">EGP 600</div>
                    <div className="text-xs">once and forever</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CheckIcon className=" text-neutral-500" size='16' />
                      <span>Everything from Go nuts plan Included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className=" text-neutral-500" size='16' />
                      <span>Email, chat, and phone support</span>
                    </div>
                  </div>
                </div>
                <a href='/payment?plan=GoSuperNuts' onClick={() => setIsOpen(false)} className="mt-4 bg-neutral-100 text-center block px-4 py-2 text-base md:text-lg rounded-3xl hover:bg-neutral-200 text-black font-bold w-full">
                  Subscribe Now
                </a>
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
                      <CheckIcon className=" text-neutral-500" size='16' />
                      <span>Customized background removal solution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className=" text-neutral-500" size='16' />
                      <span>Dedicated account manager</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className=" text-neutral-500" size='16' />
                      <span>Enterprise-level support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon className=" text-neutral-500" size='16' />
                      <span>Tailored pricing</span>
                    </div>
                  </div>
                </div>
                <button className="mt-4 bg-neutral-100 text-center block px-4 py-2 text-base md:text-lg rounded-3xl hover:bg-neutral-200 text-black font-bold w-full">
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