import { createHash } from 'crypto';

export const copyToClipboard = async (dataUrl: string) => {
  try {
    // Convert the Data URL to a Blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    
    // Check if the image is in a supported format, convert if necessary
    let pngBlob = blob;
    if (blob.type !== 'image/png') {
      // Convert to PNG if necessary
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);

        // Convert the image to PNG Blob
        pngBlob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/png');
        });

        if (!pngBlob) {
          throw new Error("Failed to convert image to PNG format.");
        }
      }
    }

    // Create a ClipboardItem with the Blob
    const clipboardItem = new ClipboardItem({ [pngBlob.type]: pngBlob });

    // Write the ClipboardItem to the clipboard
    await navigator.clipboard.write([clipboardItem]);

    console.log("Image copied to clipboard");
  } catch (err) {
    console.error("Failed to copy image: ", err);
  }
};

export function generateHashString(text:string) {
  const hash = createHash('sha256'); // Choose your hashing algorithm
  hash.update(text);
  return hash.digest('hex'); // Return the hash as a hexadecimal string
}