'use client'

import { useState } from 'react';
import { WalletIcon, CreditCardIcon } from 'lucide-react';
import Plans from './Plans';
import LoadingDots from '../Globals/LoadingDots';


interface UserType {
  id: string;
username:string
}
const paymentOptions = [
  { value: 'movie-wallet', label: 'Mobile Wallet', icon: WalletIcon, envVar: process.env.NEXT_PUBLIC_paymob_mobile_wallet },
  { value: 'card', label: 'Credit/Debit Card', icon: CreditCardIcon, envVar: process.env.NEXT_PUBLIC_paymob_online_card }
];

export function Pay({user}: {user: UserType}) {
  console.log('Pay', user);
  
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
        body: JSON.stringify({ paymentMethod }),
      });
      const { paymentLinkResult } = await response.json();

      setRedirectLink(`https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.NEXT_PUBLIC_PAYMOB_PUBLIC_KEY}&clientSecret=${paymentLinkResult.client_secret}`);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-12 min-h-screen w-full">
      <div className='relative'>
        <p className='text-3xl md:text-4xl border-2 border-primary-300 border-dashed px-4 py-2 text-center rounded-sm'>
          Go nuts Plan
        </p>
        <div className='absolute -top-2 -right-1 backdrop-blur-3xl rounded-xl'>
          <Plans triggerClassName='bg-blue-500 text-white p-0.5 rounded-full w-6 h-6 flex items-center justify-center' triggerText='?' />
        </div>
      </div>
      <div className="w-full max-w-md mx-auto p-4 border-2 backdrop-blur-3xl rounded-xl border-primary-100 bg-primary-100/50">
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
                className={`flex items-center space-x-4 rounded-xl px-4 py-2 ${isSelected ? 'bg-primary-300' : 'hover:bg-primary-300'} ${paymentStarted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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
                'Pay EGP 90.00'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pay;
