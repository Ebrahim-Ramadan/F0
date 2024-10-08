'use client'
import {  StopCircle, XIcon } from "lucide-react";
import { Dialog } from '@headlessui/react';
import { useMemo, useState } from 'react';
import LoadingDots from '../Globals/LoadingDots'
import { youShoulds } from "@/lib/youShoulds";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PlansProps {
  triggerClassName: string;
  triggerText: string | React.ReactNode;
  user: {
    id: string;
    username: string;
    paymentDate: Date | null;
    planName: string | null;
    SubscriptionID: string | null;
  };
}

const getRandomYouShould = () => {
  const randomIndex = Math.floor(Math.random() * youShoulds.length);
  return youShoulds[randomIndex];
};
export const CancelSubscriptionModal: React.FC<PlansProps> = ({user, triggerClassName, triggerText }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState<boolean>(false)

  return (
    <>
      <div className={`flex justify-center  ${triggerText == 'Manage Account' ? 'w-full' : ''}`}>
        <button
          className={`font-medium text-center  ${triggerClassName}`}
          role="Subscribe"
          id="manage-account"
          onClick={() => setIsOpen(true)}
        >
          {/* <StopCircle size='16' /> */}
          {triggerText}
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={`fixed inset-0 flex justify-center items-center z-50 px-2 ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
        <div className={`fixed inset-0 bg-gradient-to-b from-black/40 to-black ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`} aria-hidden="true" onClick={() => setIsOpen(false)} />
        <div className={`
        [&>*]:border-neutral-700 [&>*]:pb-2 [&>*:nth-last-child(2)]:border-b-2 

        relative overflow-y-auto h-auto md:max-h-[90vh] max-h-[80vh] w-full md:max-w-3xl bg-primary-200 backdrop-blur-3xl grid gap-2 md:gap-4 max-w-7xl mx-auto py-4 md:py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border-2 border-primary-100 ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
          <div className="grid gap-2 w-full">
            <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-3xl font-bold tracking-tight">Cancel Subscription</h1>
              <button onClick={() => setIsOpen(false)} className='rounded-full bg-primary-300 hover:bg-primary-400 w-6 md:w-8 h-6 md:h-8 flex items-center justify-center'>
                <XIcon className="w-4 md:w-6 h-4 md:h-6" />
              </button>
            </div>
            <p className="text-xs md:text-sm text-primary-700">This action cannot be undone and you will lose access to the services immediately. Are you sure you want to cancel your subscription?</p>
          </div>
          <div className="w-full justify-center flex items-center flex-row">
<p className="rounded-3xl bg-primary-100 p-2 md:p-4 text-sm text-primary-900 font-semibold">
`{ useMemo(() => getRandomYouShould(), [])}`</p>
          </div>
<div className="flex justify-end pt-4">
<button 
    onClick={async()=>{
        setloading(true)
        const res = await fetch('/api/cancelSubscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user }),
        });
        const cancelSubResult = await res.json();
        console.log('cancelSubResult', cancelSubResult);
        if(cancelSubResult.error){
          toast.error(cancelSubResult.error )
        }
        else{
          toast.success(cancelSubResult.message )
        }
        setloading(false)
        router.refresh()
     
    }}
    disabled={loading}
    className="flex items-center text-sm md:text-base hover:bg-red-600 bg-red-500 gap-2 px-2 md:py-2 py-1 rounded-3xl transition duration-300 md:px-4 disabled:text-primary-700 disabled:bg-primary-100 font-medium">
       {loading ? (
              <LoadingDots/>      
              ):(
          'CONFIRM'
      )}
        </button>  
</div>
          
        </div>
      </Dialog>
    </>
  );
}

export default CancelSubscriptionModal;
