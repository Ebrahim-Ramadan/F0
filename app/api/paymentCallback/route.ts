import { NextResponse } from "next/server"

export async function POST(req:Request) {
const reqAss = await req.json()
console.log('reqAss', reqAss)
return NextResponse.json({ message: 'Payment Callback' })
}