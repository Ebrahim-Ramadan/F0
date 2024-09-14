import { createImage } from "@/app/actions";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const { image, userId } = await req.json();
      
      // Convert base64 to buffer
      const imageBuffer = Buffer.from(image.split(',')[1], 'base64');
  
      const formData = new FormData();
      formData.append('image', new Blob([imageBuffer]), 'image.png');
  
      const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMG_BB_API_KEY}`, {
        method: 'POST',
        body: formData
      });
  
      if (!imgbbResponse.ok) {
        throw new Error('Failed to upload to ImgBB');
      }
  
      const imgbbResult = await imgbbResponse.json();
      console.log('ImgBB response:', imgbbResult);
      const newImageCreated = await createImage(userId, imgbbResult.data.display_url);
      console.log('newImageCreated', newImageCreated);
      revalidatePath('/images');
      return NextResponse.json({ newImageCreated }, { status: 200 });
    } catch (error) {
      console.error('Error in /api/uploadImage:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }


