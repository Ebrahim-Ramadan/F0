import { addSubscriber } from "@/app/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const { email } = await req.json();
      await addSubscriber(email)
      return NextResponse.json({ message: 'Subscribed Successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error in /api/subscribe:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }