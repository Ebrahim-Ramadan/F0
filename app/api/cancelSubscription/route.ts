import { NextResponse } from "next/server";

export async function POST(req:Request) {
    console.log('req', await req.json())
    
return NextResponse.json({ message: 'Subscription Cancelled' })
}