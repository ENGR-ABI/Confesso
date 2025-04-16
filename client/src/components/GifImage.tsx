import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'react-konva';

declare global {
  interface Window {
    gifler: (src: string) => {
      frames: (
        canvas: HTMLCanvasElement,
        callback: (
          ctx: CanvasRenderingContext2D,
          frame: {
            buffer: HTMLCanvasElement;
            width: number;
            height: number;
          }
        ) => void
      ) => void;
    };
  }
}

interface GifImageProps {
  src?: string;
  width?: number;
  height?: number;
}

const GifImage: React.FC<GifImageProps> = ({ 
  src = '/Arrow.gif', 
  width = 60, 
  height = 60 
}) => {
  const imageRef = useRef<any>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Create a canvas element
    const canvasElement = document.createElement('canvas');
    canvasElement.width = width;
    canvasElement.height = height;
    setCanvas(canvasElement);

    // Load the gif only after canvas is set
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.gifler && canvasElement) {
        try {
          window.gifler(src)
            .frames(canvasElement, function onDrawFrame(
              ctx: CanvasRenderingContext2D,
              frame: { buffer: HTMLCanvasElement; width: number; height: number }
            ) {
              if (imageRef.current) {
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(frame.buffer, 0, 0);
                imageRef.current.getLayer()?.batchDraw();
              }
            });
        } catch (error) {
          console.error("Error loading GIF:", error);
        }
      }
    }, 100);
  }, [src]);

  return (
    canvas ? (
      <Image
        ref={imageRef}
        image={canvas}
        width={width}
        height={height}
      />
    ) : null
  );
};

export default GifImage;