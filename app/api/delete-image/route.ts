import { deleteImage } from "@/app/actions";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
console.log('POST id', id);

    if (!id ) {
      return new Response('Invalid or missing ID', { status: 400 });
    }

    await deleteImage(id);
    revalidatePath('/images')

    return NextResponse.json({ message: 'Deleted Successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
