
export const copyToClipboard = async (url) => {
  try {
    // Fetch the image from the URL and convert it to a Blob
    const response = await fetch(url);
    const blob = await response.blob();

    // Create a clipboard item with the image blob
    const clipboardItem = new ClipboardItem({ [blob.type]: blob });

    // Write the clipboard item to the clipboard
    await navigator.clipboard.write([clipboardItem]);

    console.log("Image copied to clipboard");
  } catch (err) {
    console.error("Failed to copy image: ", err);
  }
};