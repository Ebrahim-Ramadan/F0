import { NextResponse } from 'next/server';


const SUBSCRIPTION_PLAN_IDS = {
  Hoppy: process.env.HoppyPlan_Sub_Plan_ID,
  GoNuts: process.env.GoNuts_Sub_Plan_ID,
  GoSuperNuts: process.env.GoSuperNuts_Sub_Plan_ID,
};
const now = new Date();
const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Add 1 day in milliseconds
// Format as 'YYYY-MM-DD'
const year = oneDayFromNow.getFullYear();
const month = String(oneDayFromNow.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(oneDayFromNow.getDate()).padStart(2, '0');
const subscriptionStartDate = `${year}-${month}-${day}`;



function validateUsername(username: string): string {
  if (!username.includes('@') || !username.includes('.')) {
    return `${username.replace(' ', '')}@gmail.com`;
  }
  return username;
}
export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
  const { paymentMethod, username, userID, plan, amount } = await req.json();
  console.log( 'ass', paymentMethod, username, userID, plan, amount);
  console.log('validateUsername(username)', validateUsername(username));
  
  if (!paymentMethod) {
    return NextResponse.json({ error: 'paymentMethod not valid' }, { status: 405 });
  }

  // Get the correct subscription plan ID based on the selected plan
  const subscription_id = SUBSCRIPTION_PLAN_IDS[plan as keyof typeof SUBSCRIPTION_PLAN_IDS];
  console.log('subscription_id', subscription_id);
  
  if (!subscription_id) {
    return NextResponse.json({ error: 'Invalid subscription plan' }, { status: 400 });
  }

  try {
    const paymentLinkHeaders = new Headers();
    paymentLinkHeaders.append("Authorization", `Bearer ${process.env.PAYMOB_SECRET_KEY}`);
    paymentLinkHeaders.append("Content-Type", "application/json");

    const paymentLinkBody = JSON.stringify({
      "amount": Number(amount),
      "currency": "EGP",
      "payment_methods": [
        Number(paymentMethod),
        "card",
      ],
      "subscription_plan_id": Number(subscription_id), // Use the correct subscription plan ID
      "subscription_start_date": subscriptionStartDate, // Add 1 hour in milliseconds Format as 'YYYY-MM-DD'
      "items": [
        {
          "name": `${plan} Subscription`,
          "amount": Number(amount),
          "description": `${plan} Plan Subscription`,
          "quantity": 1
        }
      ],
      "billing_data": {
        "apartment": "N/A",
        "first_name": userID,
        "last_name": plan,
        "street": "N/A",
        "building": "N/A",
        "phone_number": "+20000000000", // You might want to collect this from the user
        "country": "EGYPT",
        "email": validateUsername(username),
        "floor": "N/A",
        "state": "N/A"
      },
      "customer": {
        "first_name": userID,
        "last_name": plan,
        "email": validateUsername(username),
      },
      "extras": {
        "plan_type": plan
      }
    });

    const paymentLinkResponse = await fetch("https://accept.paymob.com/v1/intention/", {
      method: 'POST',
      headers: paymentLinkHeaders,
      body: paymentLinkBody,
    });

    const paymentLinkResult = await paymentLinkResponse.json();
    console.log('paymentLinkResult', paymentLinkResult);
    
    return NextResponse.json({ paymentLinkResult }, { status: 200 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: (error as Error).message || 'Internal Server Error' }, { status: 500 });
  }
}