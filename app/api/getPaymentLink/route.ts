
import { NextResponse } from 'next/server';

export async function POST(req:Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
  const {paymentMethod} = await req.json()
  console.log('paymentMethod', paymentMethod);
  
  if(!paymentMethod){
    return NextResponse.json({ error: 'paymentMethod not valid' }, { status: 405 });
  }
  try {
    // Fetch authentication token
    const authHeaders = new Headers();
    authHeaders.append("Content-Type", "application/json");

    const authBody = JSON.stringify({
      "api_key": process.env.PAYMOB_API_KEY, // Ensure this is set in your environment
    });

    const authResponse = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: 'POST',
      headers: authHeaders,
      body: authBody,
    });
    
    const authResult = await authResponse.json();
    console.log('authResult', authResult)

    if (!authResult.token) {
      throw new Error('Failed to obtain auth token');
    }

    // Create Subscription Plan
    const subscriptionHeaders = new Headers();
    subscriptionHeaders.append("Content-Type", "application/json");
    subscriptionHeaders.append("Authorization", `Bearer ${authResult.token}`);

    const subscriptionBody = JSON.stringify({
      "frequency": 7, // Example frequency
      "name": "Testplan 3",
      "reminder_days": null,
      "retrial_days": null,
      "plan_type": "rent",
      "number_of_deductions": null,
      "amount_cents": 9000,
      "use_transaction_amount": true,
      "is_active": true,
      "integration": Number(paymentMethod), // Your Moto Integration ID
      "fee": null
    });

    const subscriptionResponse = await fetch("https://accept.paymob.com/api/acceptance/subscription-plans", {
      method: 'POST',
      headers: subscriptionHeaders,
      body: subscriptionBody,
    });

    const subscriptionResult = await subscriptionResponse.json();
    console.log('subscriptionResult', subscriptionResult)
    
    if (!subscriptionResult.id) {
      throw new Error('Failed to create subscription plan');
    }

    const paymentLinkHeaders = new Headers();
    paymentLinkHeaders.append("Authorization", `Bearer ${process.env.PAYMOB_SECRET_KEY}`); 
    paymentLinkHeaders.append("Content-Type", "application/json");

    const paymentLinkBody = JSON.stringify({
      "amount": 9000,
      "currency": "EGP",
      "payment_methods": [
        Number(paymentMethod), // Your Moto Integration ID
        "card",
      ],
      "subscription_plan_id": subscriptionResult.id, 
      "subscription_start_date": "2024-10-20",
      "items": [
        {
          "name": "Item name 1",
          "amount": 9000,
          "description": "Watch",
          "quantity": 1
        }
      ],
      "billing_data": {
        "apartment": "6",
        "first_name": "Ammar",
        "last_name": "Sadek",
        "street": "938, Al-Jadeed Bldg",
        "building": "939",
        "phone_number": "+96824480228",
        "country": "EGYPT",
        "email": "AmmarSadek@gmail.com",
        "floor": "1",
        "state": "Alkhuwair"
      },
      "customer": {
        "first_name": "Ammar",
        "last_name": "Sadek",
        "email": "AmmarSadek@gmail.com",
        "extras": {
          "re": "22"
        }
      },
      "extras": {
        "ee": 22
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
