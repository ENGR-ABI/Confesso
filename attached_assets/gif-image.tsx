"use client"
import React from 'react';
import { Image } from 'react-konva';

// Add type declarations for gifler
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

const GifImage: React.FC<GifImageProps> = ({ src = '/Arrow.gif', width, height }) => {
  const imageRef = React.useRef<any>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(document.createElement('canvas'));

  React.useEffect(() => {
    // Load gifler library
    const script = document.createElement('script');
    script.src = '/gifler.min.js';
    
    script.onload = () => {
      // use external library to parse and draw gif animation
      function onDrawFrame(ctx: CanvasRenderingContext2D, frame: { buffer: HTMLCanvasElement; width: number; height: number }) {
        // update canvas size
        canvasRef.current.width = frame.width;
        canvasRef.current.height = frame.height;
        // update canvas that we are using for Konva.Image
        ctx.drawImage(frame.buffer, 0, 0);
        // update Konva.Image
        if (imageRef.current) {
          const layer = imageRef.current.getLayer?.();
          if (layer) {
            layer.batchDraw();
          }
        }
      }

      if (window.gifler) {
        window.gifler(src).frames(canvasRef.current, onDrawFrame);
      }
    };

    document.head.appendChild(script);
    return () => script.remove();
  }, [src]);

  return (
    <Image
      ref={imageRef}
      image={canvasRef.current}
      width={width}
      height={height}
    />
  );
};

export default GifImage;