import { NextResponse } from 'next/server';
import { Rembg } from "@xixiyahaha/rembg-node";
import sharp from "sharp";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as Blob;

    if (!file) {
      throw new Error('No file provided');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const input = sharp(buffer);
    const rembg = new Rembg({ logging: true });
    const output = await rembg.remove(input);
    const processedBuffer = await output.webp().toBuffer();

    const processedBase64 = processedBuffer.toString('base64');
    return NextResponse.json({ processedBase64: `data:image/webp;base64,${processedBase64}` });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}

const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };