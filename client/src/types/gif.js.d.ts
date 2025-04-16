declare module 'gif.js' {
  interface GifOptions {
    workers?: number;
    quality?: number;
    width?: number;
    height?: number;
    workerScript?: string;
    transparent?: string | null;
    background?: string;
    repeat?: number;
    dither?: boolean;
  }

  interface GifFrameOptions {
    delay?: number;
    copy?: boolean;
    dispose?: number;
  }

  class GIF {
    constructor(options: GifOptions);
    addFrame(element: HTMLCanvasElement | HTMLImageElement, options?: GifFrameOptions): void;
    render(): void;
    on(event: 'finished', callback: (blob: Blob) => void): void;
    on(event: 'progress', callback: (progress: number) => void): void;
    on(event: 'error', callback: (error: Error) => void): void;
    on(event: string, callback: (...args: any[]) => void): void;
  }

  export = GIF;
}