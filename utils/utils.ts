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
        canvas.toBlob((pngBlob) => {
          if (pngBlob) {
            pngBlob = pngBlob;
          }
        }, 'image/png');
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
