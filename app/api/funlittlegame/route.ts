import { NextRequest, NextResponse } from 'next/server';
import { words } from './words';

export const dynamic = 'force-dynamic';


const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };
export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();
  let intervalId: NodeJS.Timeout | null = null;
  let isClosed = false;

  const stream = new ReadableStream({
    start(controller) {

      const sendData = () => {
        if (isClosed) {
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
          return;
        }
        
        try {
        const word = getRandomWord();
        const data = `${word}\n`;
          controller.enqueue(encoder.encode(data));
        } catch (error) {
          console.error('Error sending data:', error);
          closeStream();
        }
      };

      const closeStream = () => {
        if (!isClosed) {
          isClosed = true;
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
          try {
            controller.close();
          } catch (error) {
            console.error('Error closing controller:', error);
          }
        } else {
        }
      };

      sendData(); // initial data
      intervalId = setInterval(sendData, 1000);

      req.signal.addEventListener('abort', () => {
        closeStream();
      });
    },
    cancel() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      isClosed = true;
    }
  });

  return new NextResponse(stream, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
