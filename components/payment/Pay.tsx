'use client'

import { useState } from 'react';
import {  CreditCardIcon,  CheckIcon, ArrowRight } from 'lucide-react';
// import Plans from './Plans';
import LoadingDots from '../Globals/LoadingDots';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
const Plans = dynamic(() => import('./Plans'), {
  ssr: true,
});
const plans = [{'Hoppy':'90'}, {'Go-nuts':'135'}, {'Go-super-nuts':'600'}];
interface UserType {
  id: string;
username:string
}
const paymentOptions = [
  // { value: 'movie-wallet', label: 'Mobile Wallet', icon: WalletIcon, envVar: process.env.NEXT_PUBLIC_paymob_mobile_wallet },
  { value: 'card', label: 'Credit/Debit Card', icon: CreditCardIcon, envVar: process.env.NEXT_PUBLIC_paymob_online_card }
];

export function Pay({user}: {user: UserType}) {
  console.log('user', user);
  
  const searchParams = useSearchParams();
  const passedPlan = searchParams.get('plan') || 'Hoppy';
  console.log('passedPlan', passedPlan);

  const [paymentMethod, setPaymentMethod] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [redirectLink, setRedirectLink] = useState<string>('');
  const [paymentStarted, setPaymentStarted] = useState<boolean>(false); // New state for tracking payment start

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
      console.log(`Proceeding to payment with ${paymentMethod}`);
      const response = await fetch('/api/getPaymentLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethod , 
          username:user.username, 
          userID:user.id, 
          // @ts-ignore
          plan:plans.find(plan => plan.hasOwnProperty(passedPlan)) ? passedPlan?.replace(/-/g, ' ') : 'Hoppy',
          // @ts-ignore
          amount : plans.find(plan => passedPlan in plan)[passedPlan]*100}),
      });
      const { paymentLinkResult } = await response.json();

      setRedirectLink(`https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.NEXT_PUBLIC_PAYMOB_PUBLIC_KEY}&clientSecret=${paymentLinkResult.client_secret}`);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen w-full">
      <div className='relative mb-12'>
        <p className={`text-3xl md:text-4xl border-2 border-primary-300 border-dashed px-4 py-2 text-center rounded-sm ${passedPlan == 'Go-super-nuts'&&'border-green-800'} ${passedPlan == 'Go-nuts'&&'border-green-900'} `}>
        {/* @ts-ignore */}
          {plans.find(plan => plan.hasOwnProperty(passedPlan)) ? passedPlan?.replace(/-/g, ' ') : 'Hoppy'} <span className='text-primary-900'>Plan</span>
        </p>
        <div className='absolute -top-2 -right-1 backdrop-blur-3xl rounded-xl'>
          <Plans triggerClassName='bg-blue-500 text-white p-0.5 rounded-full w-6 h-6 flex items-center justify-center' triggerText='?' />
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
                className={`relative flex items-center space-x-4 rounded-xl px-4 py-2 ${isSelected ? 'bg-primary-300' : 'hover:bg-primary-300'} ${paymentStarted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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
                  className="form-radio w-4 h-4 text-primary-600"
                  disabled={paymentStarted}
                />
                <label htmlFor={option.value} className="flex items-center w-full">
                  <Icon className="mr-2 h-5 w-5 text-primary-700" />
                  {option.label}
                </label>
                {isSelected && <div className="absolute top-1/2 right-2 transform -translate-y-1/2 w-4 h-4   flex items-center justify-center">
                  <CheckIcon size='16' className="text-primary-900"/>
                </div>
          }
              </div>
            );
          })}
        </div>
        <div className="mt-4 w-full flex justify-center items-center">
          {redirectLink.trim().length > 0 ? (
            <a href={redirectLink} target="_blank" className='text-center w-full py-2 px-4 rounded-xl text-white font-semibold bg-blue-500 hover:bg-blue-600'>Proceed Now</a>
          ) : (
            <button
              onClick={handleProceedToPayment}
              disabled={!paymentMethod || paymentStarted}
              className={`w-full py-2 px-4 rounded-xl text-white font-semibold ${paymentMethod ? 'bg-blue-500 hover:bg-blue-600' : 'bg-primary-300 cursor-not-allowed'}`}
            >
              {loading ? (
                <div className='w-full flex items-center justify-center'><LoadingDots /></div>
              ) : (
        //  @ts-ignore
        `Pay EGP ${plans.find(plan => passedPlan in plan)?.[passedPlan] || '90'}.00`
              )}
            </button>
          )}
        </div>
      </div>
      <div className={`max-w-md mx-auto flex items-center justify-between px-3 py-1.5 text-xs text-primary-800 md:text-sm relative rounded-b-xl bg-primary-100 w-fit transition duration-300 h-fit justify-center text-center`}>
      The only supported payment method for this subscription is the Online Card (Visa/ MasterCard).
  </div>

  <div className='max-w-md mx-auto py-2 mt-4'>
<a href='/images' className='flex flex-row gap-2 items-center text-center w-full py-2 px-4 rounded-xl text-white font-semibold bg-primary-100 hover:bg-primary-200 text-sm md:text-base'>
Proceed without subscription
<ArrowRight size='16'/>
</a>
  </div>
    </div>
  );
}

export default Pay;


export const ClientComponentSuccessfulPayment = () => {
  const router = useRouter()

const handleGetStarted = () => {
  router.push('/images')
}
return (
  <div className='flex justify-center items-center'>
        <button className="bg-primary-950 text-black px-4 py-2 rounded-3xl text-base md:text-lg font-bold" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
)
}
