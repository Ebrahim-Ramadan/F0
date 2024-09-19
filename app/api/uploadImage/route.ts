import { createImage, incrementTrialCount } from "@/app/actions";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import ImageKit from 'imagekit';
interface ResultType {
  url: string; 
}


export async function POST(req: Request) {
  const { image, userId } = await req.json();

  try {
    const UpdatedUserWithHavingTriedOnce = await incrementTrialCount(userId);
    console.log('UpdatedUserWithHavingTriedOnce', UpdatedUserWithHavingTriedOnce);
    revalidatePath('/images');
    
    const imageBuffer = Buffer.from(image.split(',')[1], 'base64');
    const imagekit = new ImageKit({
      publicKey: process.env.ImageKIT_PUBLIC_KEY as string,
      privateKey: process.env.ImageKIT_PRIVATE_KEY as string,
      urlEndpoint: process.env.ImageKIT_API_URL as string,
    });

    const uploadImage = (imageBuffer: Buffer) => {
      return new Promise<ResultType>((resolve, reject) => {
        imagekit.upload({
          file: imageBuffer, 
          fileName: "ass.jpg", 
          tags: ["tag1", "tag2"]
        }, (error, result) => {
          if (error) reject(error);
          else resolve(result as ResultType);
        });
      });
    };


    
    const result:ResultType  = await uploadImage(imageBuffer);

  
    const newImageCreated = await createImage(userId, result.url);

    
    revalidatePath('/images');

    
    return NextResponse.json({ newImageCreated }, { status: 200 });

  } catch (error) {
    console.error('Error in /api/uploadImage:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
