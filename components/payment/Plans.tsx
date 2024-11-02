'use client'
// 'use cache'
import { ArrowRight, CheckIcon, XIcon,  ImageDown,  CircleCheck, GraduationCap, ReceiptPoundSterlingIcon, CheckCheckIcon, PlaneIcon, HopIcon, LucideTarget, Superscript, ChartArea, ThermometerSnowflake, PhoneCall } from "lucide-react"
import { Dialog,  } from '@headlessui/react'
import { ReactNode, useState } from 'react'
import Tabs from "./Tabs";

interface Plan {
  name: string;
  description: string;
  price: string;
  priceType: string;
  features: {
    label: string;
    icon: ReactNode;
  }[];
  ctaUrl: string;
}

interface PlansProps {
  triggerClassName: string;
  triggerText: string | React.ReactNode;
}

export const Plans: React.FC<PlansProps> = ({ triggerClassName, triggerText }) => {
  const [isOpen, setIsOpen] = useState(false);


  const plans: Plan[] = [
    {
      name: "Hoppy Plan",
      description: "150 images each month",
      price: "EGP 90",
      priceType: "/month",
      features: [
        {
          label: "Batch background removal for up to 150 images",
          icon: <ImageDown className="w-4 h-4" />
        },
        {
          label: "No restrictions or commercial shit",
          icon: <ReceiptPoundSterlingIcon className="w-4 h-4" />
        },
        {
          label: "Monthly payment",
          icon: <CircleCheck className="w-4 h-4" />
        },
      ],
      ctaUrl: "/payment?plan=Hoppy",
    },
    {
      name: "Go nuts Plan",
      description: "300 images each month",
      price: "EGP 135",
      priceType: "/month",
      features: [
        {
          label: "Everything from Hoppy plan Included",
          icon: <CheckIcon className="w-4 h-4" />
        },
        {
          label: "Premium image quality",
          icon: <LucideTarget className="w-4 h-4" />
        },
      ],
      ctaUrl: "/payment?plan=GoNuts",
    },
    {
      name: "Go super nuts Plan",
      description: "unlimited images",
      price: "EGP 600",
      priceType: "once and forever",
      features: [
        {
          label: "Everything from Go nuts plan Included",
          icon: <CheckCheckIcon className="w-4 h-4" />
        },
        {
          label: "Email, chat, and phone support",
          icon: <PhoneCall className="w-4 h-4" />
        },
      ],
      ctaUrl: "/payment?plan=GoSuperNuts",
    },
  ];
  return (
    <>
      <div className={`flex justify-end ${triggerText == 'Manage Account' && 'w-full'} ${triggerText == 'Upgrade Plan' && 'px-2'}`}>
        <button
          className={`font-bold text-center ${triggerClassName}`}
          role="Subscribe"
          id="manage-account"
          onClick={() => setIsOpen(true)}
        >
          {triggerText}
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={`fixed inset-0 flex justify-center items-center z-50 px-2 ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
        <div className={`fixed inset-0 bg-gradient-to-b from-black/50 to-black ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`} aria-hidden="true" onClick={() => setIsOpen(false)} />
        <div className="-z-50 absolute w-[150px] h-[150px] bg-neutral-100 z-0 blur-[150px] top-0 bottom-0 left-0 right-0 m-auto rounded-full"></div>
        <div className={`relative overflow-y-auto h-auto md:max-h-[90vh] max-h-[80vh] w-full md:max-w-3xl bg-primary-100/20 backdrop-blur-3xl grid gap-8 max-w-7xl mx-auto pt-4 md:pt-12 px-4 sm:px-6 lg:px-8 rounded-3xl border-2 border-primary-300 ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
          <div className="w-full h-[300px] flex absolute top-0 left-0 right-0 z-[-1] m-auto bg-top bg-contain bg-no-repeat bg-[url('https://onvo.me/media/plus/light.png')] filter grayscale" />
          {/* <div className="w-full h-24 fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black to-transparent pointer-events-none" /> */}
          <div className="grid gap-2 w-full">
            <div className="flex justify-between items-center ">
              <h1 className="text-xl md:text-3xl font-bold tracking-tight">Subscription Plans</h1>
              <button onClick={() => setIsOpen(false)} className='rounded-full bg-primary-200/50 hover:bg-primary-200 w-6 md:w-8 h-6 md:h-8 flex items-center justify-center'>
                <XIcon className="w-4 md:w-6 h-4 md:h-6" />
              </button>
            </div>
            <p className="text-sm md:text-base text-primary-900">Find a plan to power your business. F0 has you covered</p>
          </div>

          <div className="grid gap-6 [&>*]:transition [&>*]:duration-300 [&>*]:p-4 [&>*]:rounded-3xl ">
            <Tabs/>
            {plans.map((plan, index) => (
              <div key={index} className="bg-primary-200/50">
                <div>
                  <p className="text-2xl md:text-3xl font-semibold">{plan.name}</p>
                  <p className="text-sm md:text-base mt-1 text-primary-800 tracking-tight">{plan.description}</p>
                </div>
                <div className="grid gap-6">
                  <div className="flex items-center justify-between py-2">
                    <div className="text-2xl md:text-4xl font-bold">{plan.price}</div>
                    <div className="tracking-tight text-sm">{plan.priceType}</div>
                  </div>
                  <div className="grid gap-2 ">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex text-neutral-200 items-center justify-start gap-2">
                        {feature.icon}
                        <span>{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <a href={plan.ctaUrl} onClick={() => setIsOpen(false)} className="mt-4 bg-neutral-100 text-center block px-4 py-2 text-base md:text-lg rounded-3xl hover:bg-neutral-200 text-black font-bold w-full relative">
                  <span className="block mx-auto">Subscribe Now</span>
                  <div className="w-4 md:w-6 h-4 md:h-6 justify-center rounded-full flex items-center bg-black absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2">
                    <ArrowRight color='white' size='16' className="w-3 md:w-4 h-3 md:h-4" />
                  </div>
                </a>
              </div>
            ))}
           

            <div className="">
              <div>
                <p className="text-xs px-2 py-1 bg-blue-800 text-blue-200 rounded-full font-semibold w-fit">FOUNDER MODE?</p>
              </div>
              <div className="grid gap-6">
                <div>
                  <div className="text-2xl md:text-4xl font-bold">Contact Us</div>
                  <p className="text-sm text-primary-900">Tailored to your needs</p>
                </div>
                <div className="grid gap-2">
                  <div className="flex text-neutral-300 items-center justify-between gap-2">
                    <span>Customized background removal solution</span>
                    <CheckIcon className="w-4 h-4 " size='16' />
                  </div>
                  <div className="flex text-neutral-300 items-center justify-between gap-2">
                    <span>Dedicated account manager</span>
                    <CheckIcon className="w-4 h-4 " size='16' />
                  </div>
                  <div className="flex text-neutral-300 items-center justify-between gap-2">
                    <span>Enterprise-level support</span>
                    <CheckIcon className="w-4 h-4 " size='16' />
                  </div>
                  <div className="flex text-neutral-300 items-center justify-between gap-2">
                    <span>Tailored pricing</span>
                    <CheckIcon className="w-4 h-4 " size='16' />
                  </div>
                </div>
              </div>
              <a href="https://mail.google.com/mail/u/0/?fs=1&to=ramadanebrahim791@gmail.com&tf=cm" target='_blank'  className="mt-4 bg-neutral-100 text-center block px-4 py-2 text-base md:text-lg rounded-3xl hover:bg-neutral-200 text-black font-bold w-full relative">
                  <span className="block mx-auto">Contact The Founder</span>
                  <div className="w-4 md:w-6 h-4 md:h-6 justify-center rounded-full flex items-center bg-black absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2">
                    <ArrowRight color='white' size='16' className="w-3 md:w-4 h-3 md:h-4 -rotate-45" />
                  </div>
                </a>
             
            </div>
          </div>
          <div className="sticky -bottom-6 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />


        </div>
        
      </Dialog>
    </>
  );
};

export default Plans;