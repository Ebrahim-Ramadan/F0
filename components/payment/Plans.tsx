'use client'
import { CheckIcon, Menu, XIcon, Users, Settings, Shield, Activity } from "lucide-react"
import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Plan {
  name: string;
  description: string;
  images: string;
  price: string;
  duration: string;
  benefits: string[];
  href: string;
}

interface PlansProps {
  triggerClassName: string;
  triggerText: string | React.ReactNode;
}

const plansData: Plan[] = [
  {
    name: 'Hoppy Plan',
    description: '150 images per month',
    images: '150',
    price: 'EGP 90',
    duration: '/month',
    benefits: [
      'Batch background removal for up to 150 images',
      'No restrictions or commercial use',
      'Monthly payment',
    ],
    href: '/payment?plan=Hoppy',
  },
  {
    name: 'Go nuts Plan',
    description: '300 images per month',
    images: '300',
    price: 'EGP 135',
    duration: '/month',
    benefits: [
      'Batch background removal for up to 300 images',
      'No restrictions or commercial use',
      'Monthly payment',
      'Premium image quality',
    ],
    href: '/payment?plan=GoNuts',
  },
  {
    name: 'Go super nuts Plan',
    description: 'Unlimited images',
    images: 'unlimited',
    price: 'EGP 600',
    duration: 'once and forever',
    benefits: [
      'Everything from Go nuts plan Included',
      'Email, chat, and phone support',
    ],
    href: '/payment?plan=GoSuperNuts',
  }
];

export const Plans: React.FC<PlansProps> = ({ triggerClassName, triggerText }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/activity', icon: Activity, label: 'Activity' },
    { href: '/security', icon: Shield, label: 'Security' },
  ];

  return (
    <>
      <div className={`flex justify-end ${triggerText === 'Manage Account' ? 'w-full' : ''} ${triggerText === 'Upgrade Plan' ? 'px-2' : ''}`}>
        <button
          className={`font-bold text-center ${triggerClassName}`}
          role="button"
          id="manage-account"
          onClick={() => setIsOpen(true)}
        >
          {triggerText}
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={`fixed inset-0 flex justify-center items-center z-50 px-2 ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
        <div className={`fixed inset-0 bg-gradient-to-b from-black/80 to-black ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`} aria-hidden="true" onClick={() => setIsOpen(false)} />
        <div className={`relative overflow-y-scroll h-auto md:max-h-[90vh] max-h-[80vh] w-full md:max-w-3xl bg-primary-200/50 backdrop-blur-3xl grid gap-8 max-w-7xl mx-auto py-4 md:py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border-2 border-primary-200 ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
          <div className="flex h-full">
            {/* Sidebar */}
            <aside 
            onClick={() => setIsSidebarOpen(false)}
            className={`inset-0 absolute fixed inset-0 left-0 top-0 bg-primary-100 backdrop-blur-xl w-44 border-r border-primary-200 h-full overflow-y-auto ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
              <nav className="p-4 absolute top-0 fixed sticky">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} passHref>
                    <button
                      className={`my-2 w-full flex items-center gap-2 p-2 rounded ${pathname === item.href ? 'bg-gray-100' : ''}`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
              <div className="lg:hidden flex items-center justify-between border-b border-gray-200 p-4">
                <span className="font-medium">Settings</span>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle sidebar</span>
                </button>
              </div>

              <div className="p-4 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-xl md:text-3xl font-bold tracking-tight">Subscription Plans</h1>
                  <button onClick={() => setIsOpen(false)} className='rounded-full bg-primary-300 hover:bg-primary-400 w-8 h-8 flex items-center justify-center'>
                    <XIcon className="w-6 h-6"/>
                  </button>
                </div>
                <p className="text-sm md:text-base text-primary-800">Choose the plan that best suits your background removal needs.</p>
              </div>

              <div className="grid gap-6 [&>*]:transition [&>*]:duration-300 [&>*]:p-4 [&>*]:rounded-3xl">
                {plansData.map((plan) => (
                  <div key={plan.name} className="bg-primary-300/50">
                    <div>
                      <p className="text-2xl md:text-3xl font-semibold">{plan.name}</p>
                      <p className="text-sm md:text-base mt-1 text-primary-800">{plan.description}</p>
                    </div>
                    <div className="grid gap-6">
                      <div className="flex items-center justify-between py-2">
                        <div className="text-3xl md:text-4xl font-bold">{plan.price}</div>
                        <div className="text-muted-foreground">{plan.duration}</div>
                      </div>
                      <div className="grid gap-2">
                        {plan.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckIcon className="text-neutral-500" size='16' />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <a href={plan.href} onClick={() => setIsOpen(false)} className="mt-4 bg-neutral-100 text-center block px-4 py-2 text-base md:text-lg rounded-3xl hover:bg-neutral-200 text-black font-bold w-full">
                      Subscribe Now
                    </a>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Plans;
