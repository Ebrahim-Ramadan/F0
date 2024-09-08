import { NextResponse } from 'next/server';
import { Rembg } from "@xixiyahaha/rembg-node";
import sharp from "sharp";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const input = sharp(Buffer.from(buffer));

        // Optional arguments
        const rembg = new Rembg({
            logging: true,
        });

        const output = await rembg.remove(input);

        // Generate both regular and trimmed outputs
        const regularOutput = await output.webp().toBuffer();
        const trimmedOutput = await output.trim().webp().toBuffer();

        return NextResponse.json({
            message: 'Background removed successfully',
            regular: `data:image/webp;base64,${regularOutput.toString('base64')}`,
            trimmed: `data:image/webp;base64,${trimmedOutput.toString('base64')}`,
        });

    } catch (error) {
        console.error('Error processing image:', error);
        return NextResponse.json({ error: 'Error processing image' }, { status: 500 });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};