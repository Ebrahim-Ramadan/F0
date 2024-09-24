import { updateUserSubscriptionID } from "@/app/actions";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { transaction_id , userId} = await req.json();

    if (!transaction_id && !userId) {
      return NextResponse.json({ error: 'Transaction ID or user id not provided' }, { status: 400 });
    }

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
    console.log('authResult', authResult);

    if (!authResult.token) {
      return NextResponse.json({ error: 'token not provided' }, { status: 400 });
    }

    const urlToFetch = `${process.env.Retrieve_Sub_ID}?transaction=${transaction_id}`;
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
    console.log('SubID_response', subIDres);
    // @ts-ignore
    const updatedUser = await updateUserSubscriptionID(userId, subIDres.results[0]?.id )
    console.log('updatedUser', updatedUser);
        revalidatePath('/')
    return NextResponse.json({ message: 'HMAC validation succeeded, order details appended to firestore' }, { status: 200 });

  }  catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 401 });
  }
}
