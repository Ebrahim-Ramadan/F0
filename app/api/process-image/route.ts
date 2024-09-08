import { NextResponse } from 'next/server';
import { Rembg } from "@xixiyahaha/rembg-node";
import sharp from "sharp";
export async function POST(req: Request) {
    const requestBody = await req.json();
    console.log('requestBody', requestBody);
    const processImageFunc = async () => {
        const input = sharp("test-input.jpg");
    
        // optional arguments
        const rembg = new Rembg({
            logging: true,
        });
    
        const output = await rembg.remove(input);
        await output.webp().toFile("test-output.webp");
    
        // optionally you can use .trim() too!
        await output.trim().webp().toFile("test-output-trimmed.webp");
    }
}