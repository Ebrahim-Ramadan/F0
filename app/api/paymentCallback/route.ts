import {  updateUserPayment } from '@/app/actions';
import { createHmac } from 'crypto';
import { revalidatePath } from 'next/cache';
import { NextResponse } from "next/server";

const SECRET_KEY: string = process.env.ACCEPT_HMAC_SECRET!;


const expectedKeys = [
  'amount_cents',
  'created_at',
  'currency',
  'error_occured',
  'has_parent_transaction',
  'id',
  'integration_id',
  'is_3d_secure',
  'is_auth',
  'is_capture',
  'is_refunded',
  'is_standalone_payment',
  'is_voided',
  'order.id',
  'owner',
  'pending',
  'source_data.pan',
  'source_data.sub_type',
  'source_data.type',
  'success',
];

export async function POST(req:Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }

  // Extract HMAC from query parameters
  const url = new URL(req.url);
  const hmacReceived = url.searchParams.get('hmac');
  if (!hmacReceived) {
    return NextResponse.json({ error: 'HMAC not provided' }, { status: 400 });
  }

  // Parse the request body as JSON
  const data = await req.json();
  console.log('data', data);

  // @ts-ignore
  const getNestedProperty = (obj, path) => {
  // @ts-ignore
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  // Extract values from the 'obj' property of the data
  const objData = data.obj || {};

  // Construct the concatenated string
  const concatenatedString = expectedKeys
    .map(key => {
      let value;
      if (key.includes('.')) {
        value = getNestedProperty(objData, key);
      } else {
        value = objData[key];
      }
      value = value !== undefined ? value.toString() : '';
      // console.log(`Key: ${key}, Value: ${value}`); // Log each key and value
      return value;
    })
    .join('');

  // Compute HMAC using SHA-512
  const hmac = createHmac('sha512', SECRET_KEY)
    .update(concatenatedString)
    .digest('hex');

  // Compare HMAC values
  if (hmac === hmacReceived) {
    // console.log('HMACs match');
    const extractedData = extractTransactionInfo(data);
    console.log('extractedData', extractedData);
    
    const updatedUser = await updateUserPayment(extractedData.userID, new Date(data.obj.order.created_at), extractedData.plan);
        
    console.log('updatedUser', updatedUser);
    revalidatePath('/');
    // await fetchSubId({transaction_id: extractedData.subscription_plan_id});
    return NextResponse.json({ message: 'HMAC validation succeeded, order details appended to firestore', data }, { status: 200 });

  } else {
    // console.log('HMAC validation failed');
    return NextResponse.json({ error: 'HMAC validation failed' }, { status: 401 });
  }
}
  // @ts-ignore
function extractTransactionInfo(data) {
  const { obj } = data;
  return {
    userID: obj.order.shipping_data.first_name,
    plan: obj.order.shipping_data.last_name,
    email: obj.order.shipping_data.email,
    paymentDate: obj.order.created_at,
    subscription_plan_id: obj.id,
  };
}
