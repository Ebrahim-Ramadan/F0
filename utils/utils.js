import { createHash } from 'crypto';


export const copyToClipboard = async (dataUrl) => {
  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    
    let pngBlob = blob;
    if (blob.type !== 'image/png') {
      const img = new Image();
      img.src = URL.createObjectURL(blob);

      // Create a promise that resolves when the image is loaded
      await new Promise((resolve) => {
        img.onload = () => resolve();
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);

        // Convert the canvas to a PNG blob
        pngBlob = await new Promise((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/png');
        });

        if (!pngBlob) {
          throw new Error("Failed to convert image to PNG format.");
        }
      }
    }

    // Create a ClipboardItem and write it to the clipboard
    const clipboardItem = new ClipboardItem({ [pngBlob.type]: pngBlob });
    await navigator.clipboard.write([clipboardItem]);

    console.log("Image copied to clipboard");
  } catch (err) {
    console.error("Failed to copy image: ", err);
  }
};

export function generateHashString(text) {
  const hash = createHash('sha256');
  hash.update(text);
  return hash.digest('hex');
}

export function generateRandomString(length = 10) {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join('');
}



export const blobToBuffer = async (blob) => {
  const arrayBuffer = await blob.arrayBuffer();
  // Convert ArrayBuffer to a base64 string
  const base64String = arrayBufferToBase64(arrayBuffer);
  return base64String;
};

export const arrayBufferToBase64 = (arrayBuffer) => {
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};