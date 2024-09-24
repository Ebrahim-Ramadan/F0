import {CheckCircle } from 'lucide-react';

import CancelSubscriptionModal from './CancelSubscriptionModal';
import Plans from './Plans';

interface UserType {
  id: string;
  username: string;
  paymentDate: Date;
  planName: string;
  SubscriptionID: string; 
}

function addMonth(date: Date): Date {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + 1);
  return newDate;
}
const plans = [{'Hoppy':'90'}, {'Go nuts':'135'}, {'Go super nuts':'600'}];
const getAmount = (planName: string) => {
  const plan = plans.find(p => Object.keys(p)[0] === planName);
  return plan ? Object.values(plan)[0] : '0';
};
export function PaidSuccessfully({ user }: { user: UserType }) {
  console.log('PaidSuccessfully', user);
  const subscriptionData = {
    status: 'Active',
    plan: user.planName,
    lastPaymentDate: new Date(user.paymentDate).toLocaleDateString(), //  readable strings before including them in JSX.
    nextPaymentDate: addMonth(new Date(user.paymentDate)).toLocaleDateString(), // same
    amount: `EGP ${getAmount(user.planName)}.00`,
  };

  return (
    <div className="mx-auto max-w-3xl md:py-4 md:px-8 px-2 py-4 border-2 backdrop-blur-3xl rounded-xl border-primary-100 bg-primary-100/50 flex flex-col items-center justify-center gap-4 ">
      <div className='relative'>
        <p className='text-2xl md:text-4xl border-2 border-primary-300 border-dashed px-4 py-2 text-center rounded-sm'>
          MY PLAN
        </p>
        <div className='absolute -top-2 -right-1 backdrop-blur-3xl rounded-xl'>
          <Plans triggerClassName='bg-blue-500 text-white p-0.5 rounded-full w-6 h-6 flex items-center justify-center' triggerText='?' />
        </div>
      </div>
      <div className="mt-4 ">
        <div className='space-y-2'>
          <div className="flex justify-between items-center">
            <div className='text-lg md:text-3xl'>Subscription Status</div>
            <div className="bg-green-500 flex items-center flex-row rounded-full px-2 py-1 text-xs md:text-sm text-white">
              <CheckCircle className="mr-1 h-4 w-4" />
              ACTIVE
            </div>
          </div>
          <div className='text-sm md:text-base text-primary-800'>Your subscription is active, and payments are automated</div>
        </div>
        <div>
          <div className="space-y-1 py-2">
            <p><strong className='text-primary-800'>CURRENT PLAN:</strong> {subscriptionData.plan}</p>
            <p><strong className='text-primary-800'>LAST PAYMENT:</strong> {subscriptionData.lastPaymentDate}</p>
            <p><strong className='text-primary-800'>NEXT PAYMENT:</strong> {subscriptionData.nextPaymentDate}</p>
            <p><strong className='text-primary-800'>AMOUNT:</strong> {subscriptionData.amount}</p>
          </div>
        </div>
        <div className="flex justify-end py-4">
    <CancelSubscriptionModal
    Subscription_id={user.SubscriptionID}
        triggerClassName='flex items-center text-sm md:text-base hover:bg-red-600 bg-red-500 gap-2 md:px-4 px-2 md:py-2 py-1 rounded-lg transition duration-300 disabled:text-primary-700 disabled:bg-primary-100'
        triggerText='Cancel Subscription'
    />

        </div>
      </div>
    </div>
  );
}

export default PaidSuccessfully;

