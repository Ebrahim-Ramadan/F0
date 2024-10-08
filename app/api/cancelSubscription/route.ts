import { updateUserPayment } from "@/app/actions";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {user} = await req.json();

    if (!user.lastTransactionID) {
      return new Response('Invalid or missing lastTransactionID', { status: 400 });
    }
    const authHeaders = new Headers();
    authHeaders.append("Content-Type", "application/json");

    const authBody = JSON.stringify({
        "api_key": process.env.PAYMOB_API_KEY, 
    });

    const authResponse = await fetch("https://accept.paymob.com/api/auth/tokens", {
        method: 'POST',
        headers: authHeaders,
        body: authBody,
    });
    
    const authResult = await authResponse.json();
console.log('authResult', authResult);

    if (!authResult.token) {
      throw new Error('Failed to obtain auth token');
    }
    const urlToFetch = `${process.env.Retrieve_Sub_ID}?transaction=${user.lastTransactionID}`;
    console.log('Complete URL', urlToFetch);

    // await wait(1000);

    const SubID_response = await fetch(urlToFetch, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authResult.token}`,
        'Content-Type': 'application/json',
      }
    });

    const subIDres = await SubID_response.json();
    console.log('subIDres', subIDres);
    
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${authResult.token}`);
    myHeaders.append('Content-Type', 'application/json'); // Optional, if you need to specify content type

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(
      `https://accept.paymob.com/api/acceptance/subscriptions/${subIDres.results[0]?.id}/cancel`,
    //   @ts-ignore
      requestOptions
    );

    const cancelSubResult = await response.json();
    console.log('cancelSubResult', cancelSubResult);
    
    if (response.status === 404) {
        return NextResponse.json({ error: 'Subscription not found', details: cancelSubResult }, { status: 404 });
    }
     // @ts-ignore
     const {success} = await updateUserPayment(user.id, null, null, null)
     revalidatePath('/')
     console.log('ass');
     if(success) return NextResponse.json({ message: 'Subscription Cancelled Successfully' }, { status: 200 });
     return NextResponse.json({ error: 'Something Wrong Occurred', details: cancelSubResult }, { status: 404 });

  } catch (error) {
    console.error('Error Canceling Subscription:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
