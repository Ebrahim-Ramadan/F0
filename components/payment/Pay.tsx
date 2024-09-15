'use client'
// import React from 'react'

// export const Pay = () => {
//     const [redircttLink, setredircttLink] = React.useState<string> ('')
//   return (
//     <div>
//         <button onClick={
//             async()=>{
//                 const response = await fetch('/api/getPaymentLink', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//             })
//             const {paymentLinkResult} = await response.json()
            
//             console.log('response', paymentLinkResult)
//             console.log('url', ` https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.NEXT_PUBLIC_PAYMOB_PUBLIC_KEY}&clientSecret=${paymentLinkResult.client_secret}`)
//             setredircttLink(`https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.NEXT_PUBLIC_PAYMOB_PUBLIC_KEY}&clientSecret=${paymentLinkResult.client_secret}`)
            
//         }}>
//             Pay
//         </button>
//         {redircttLink.trim().length>0 && <a href={redircttLink} target="_blank">Proceed</a>}
//     </div>
//   )
// }
import { useState } from 'react';
import { WalletIcon, CreditCardIcon } from 'lucide-react';
import Plans from './Plans';

const paymentOptions = [
  { value: 'movie-wallet', label: 'Mobile Wallet', icon: WalletIcon, envVar: process.env.NEXT_PUBLIC_paymob_mobile_wallet },
  { value: 'card', label: 'Credit/Debit Card', icon: CreditCardIcon, envVar: process.env.NEXT_PUBLIC_paymob_online_card }
];

export function Pay() {
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleProceedToPayment = () => {
    if (paymentMethod) {
      console.log(`Proceeding to payment with ${paymentMethod}`);
      // Here you would integrate with Paymob's API to initiate the payment process
    }
  };

  return (
   <div className="flex flex-col items-center justify-center gap-4 md:gap-12 min-h-screen w-full">
  <div className='relative '>
    <p className='text-3xl md:text-4xl border-2 border-primary-200 border-dashed px-4 py-2 text-center'>
    Go nuts Plan
      
    </p>
        <div className='absolute -top-2 -right-1 backdrop-blur-3xl rounded-xl'>
        <Plans triggerClassName='bg-blue-500 text-white p-0.5 rounded-full w-6  h-6  flex items-center justify-center' triggerText='?'/>

          
      </div>
  </div>
     <div className="w-full max-w-md mx-auto p-4 border-2 backdrop-blur-3xl rounded-xl border-primary-100 bg-primary-100/50">
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">Choose Payment Method</h2>
        <p className="text-primary-700 text-xs md:text-sm mt-2">Select how you'd like to pay for your subscription</p>
      </div>
      <div className=" flex flex-col space-y-2 cursor-pointer">
        {paymentOptions.map((option) => {
          const Icon = option.icon; // Dynamically get the icon component
          return (
            <div className="flex items-center space-x-4  hover:bg-primary-300 rounded-xl px-4 py-2" key={option.value}>
              <input
                type="radio"
                id={option.value}
                name="payment-method"
                value={option.envVar}
                onChange={handlePaymentMethodChange}
                className="form-radio w-4 h-4 text-primary-600"
              />
              <label htmlFor={option.value} className="flex items-center w-full ">
                <Icon className="mr-2 h-5 w-5 text-primary-700" />
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <button
          onClick={handleProceedToPayment}
          disabled={!paymentMethod}
          className={`w-full py-2 px-4 rounded-xl text-white font-semibold ${paymentMethod ? 'bg-blue-500 hover:bg-blue-600' : 'bg-primary-300 cursor-not-allowed'}`}
        >
          Proceed to Pay EGP 90.00
        </button>
      </div>
    </div>
   </div>
  );
}

export default Pay;
