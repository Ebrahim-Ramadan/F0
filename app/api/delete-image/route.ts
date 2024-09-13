import { deleteImage } from "@/app/actions";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse JSON from the request body
    const { id } = await req.json();
console.log('POST id', id);

    // Ensure id is provided and valid
    if (!id ) {
      return new Response('Invalid or missing ID', { status: 400 });
    }

    // Call the deleteImage function with the ID
    await deleteImage(id);
    revalidatePath('/images')

    return NextResponse.json({ message: 'Deleted Successfully' }, { status: 200 });
  } catch (error) {
    // Log the error and return an error response
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
