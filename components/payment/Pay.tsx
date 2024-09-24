'use client'

import { useState } from 'react';
import {  CreditCardIcon,  CheckIcon, ArrowRight } from 'lucide-react';
import LoadingDots, { LoadingSpinner } from '../Globals/LoadingDots';
import {   useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const Plans = dynamic(() => import('./Plans'), {
  ssr: true,
});
const plans = [{'Hoppy':'90'}, {'GoNuts':'135'}, {'GoSuperNuts':'600'}];
interface UserType {
  id: string;
  username:string
}
const paymentOptions = [
  { value: 'card', label: 'Credit/Debit Card', icon: CreditCardIcon, envVar: process.env.NEXT_PUBLIC_paymob_online_card }
];

export function Pay({user}: {user: UserType}) {
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const passedPlan = searchParams.get('plan') || 'Hoppy';

  const [paymentMethod, setPaymentMethod] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentStarted, setPaymentStarted] = useState<boolean>(false); 

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!paymentStarted) {
      // @ts-ignore
      setPaymentMethod(event.target.value);
    }
  };

  const handleProceedToPayment = async() => {
    setPaymentStarted(true); // Set paymentStarted to true

    setLoading(true);
    if (paymentMethod) {

      const response = await fetch('/api/getPaymentLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethod , 
          username:user.username, 
          userID:user.id, 
          // @ts-ignore
          paymentMethod: process.env.NEXT_PUBLIC_paymob_online_card,
          // @ts-ignore
          plan:plans.find(plan => plan.hasOwnProperty(passedPlan)) ? passedPlan?.replace(/-/g, ' ') : 'Hoppy',
          // @ts-ignore
          amount : plans.find(plan => passedPlan in plan)?.[passedPlan] * 100 || 9000}),
      });

      const { paymentLinkResult } = await response.json();
      router.push(`https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.NEXT_PUBLIC_PAYMOB_PUBLIC_KEY}&clientSecret=${paymentLinkResult.client_secret}`)

    }
  };

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen w-full">
      <div className='relative mb-12'>
        <p className={`text-3xl md:text-4xl border-2 border-primary-300 bg-primary-100/20 backdrop-blur-3xl border-dashed px-4 py-2 text-center rounded-sm ${passedPlan == 'Go-super-nuts'&&'border-green-800'} ${passedPlan == 'Go-nuts'&&'border-green-900'} `}>
        {/* @ts-ignore */}
          {plans.find(plan => plan.hasOwnProperty(passedPlan)) ? passedPlan?.replace(/-/g, ' ') : 'Hoppy'} <span className='text-primary-900'>Plan</span>
        </p>
        <div className='absolute -top-2 -right-1 backdrop-blur-3xl rounded-xl'>
          <Plans triggerClassName='bg-blue-900 text-blue-100 p-0.5 rounded-full w-6 h-6 flex items-center justify-center' triggerText='?' />
        </div>
      </div>
      <div className="w-full max-w-md mx-auto p-4 md:p-8 border-2 backdrop-blur-3xl rounded-xl border-primary-300/50 bg-primary-200">
        <div className="mb-4">
          <h2 className="text-xl md:text-3xl font-bold">Choose Payment Method</h2>
          <p className="text-primary-700 text-xs md:text-sm mt-2">Select how you'd like to pay for your subscription</p>
        </div>
        <div className="flex flex-col space-y-2 cursor-pointer">
          {paymentOptions.map((option) => {
            const Icon = option.icon; // Dynamically get the icon component
            const isSelected = paymentMethod === option.envVar;
            return (
              <div 
                className={`relative flex items-center space-x-4 rounded-xl p-4 ${isSelected ? 'bg-primary-300' : 'hover:bg-primary-300'} ${paymentStarted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                key={option.value}
                onClick={() => !paymentStarted && handlePaymentMethodChange({ target: { value: option.envVar } } as React.ChangeEvent<HTMLInputElement>)}
              >
                <input
                  type="radio"
                  id={option.value}
                  name="payment-method"
                  value={option.envVar}
                  checked={isSelected}
                  onChange={handlePaymentMethodChange}
                  className="form-radio w-4 h-4 text-primary-600 disabled:cursor-not-allowed disabled:bg-primary-50 disabled:text-primary-500 disabled:border-primary-200 disabled:shadow-none"
                  disabled={paymentStarted}
                />
                <label htmlFor={option.value} className="flex items-center w-full">
                  <Icon className="mr-2 h-5 w-5 text-primary-700" />
                  {option.label}
                </label>
                {isSelected && <div className="absolute top-1/2 right-3 transform -translate-y-1/2 w-4 h-4   flex items-center justify-center">
                  <CheckIcon size='16' className="text-primary-900"/>
                </div>
          }
              </div>
            );
          })}
        </div>
        <div className="mt-4 w-full flex justify-center items-center">
          {!loading?
           <button
           onClick={handleProceedToPayment}
           disabled={!paymentMethod || paymentStarted}
           className={`w-full py-2 px-4 rounded-xl text-white font-semibold ${paymentMethod ? 'bg-blue-500 hover:bg-blue-600' : 'bg-primary-300 cursor-not-allowed'}`}
         >
           {/*  @ts-ignore */}
     Pay EGP {plans.find(plan => passedPlan in plan)?.[passedPlan] || '90'}.00
         </button>
         :
         <div 
         className={` flex items-center justify-center  w-full py-1 rounded-xl text-white font-semibold `}
         ><LoadingSpinner /></div>

        }
       
        </div>
      </div>
      
      <div className={`max-w-md mx-auto flex items-center justify-between px-3 py-1.5 text-xs text-primary-800 md:text-sm relative rounded-b-xl bg-primary-100 w-fit transition duration-300 h-fit justify-center text-center`}> <span className='has-tooltip'><span className='tooltip rounded shadow-lg px-2 py-1 bg-primary-100 text-primary-950 -mt-8'>That is just Paymob Thing</span>The only supported payment method for this subscription is the Online Card (Visa/ MasterCard).</span></div>

  <div className='max-w-md mx-auto py-2 mt-4'>
<Link href='/images' className='group flex flex-row gap-2 items-center text-center w-full py-2 px-4 rounded-3xl text-white font-semibold bg-primary-300/70 hover:bg-primary-300 text-sm md:text-base transition-all duration-200 '>
Proceed without subscription
<ArrowRight size='16' className='text-primary-700 group-hover:text-primary-800 transition-all duration-300 '/>
</Link>
  </div>
    </div>
  );
}

export default Pay;


