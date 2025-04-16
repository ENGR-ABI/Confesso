import html2canvas from 'html2canvas';
import GIF from 'gif.js';

type GifFrameOptions = {
  delay: number;
  copy: boolean;
};

/**
 * Creates a GIF from the provided container element
 * @param container The DOM element to convert to a GIF
 * @returns Promise<string> A data URL of the generated GIF
 */
export async function createGif(container: HTMLElement): Promise<string> {
  try {
    // Configuration for GIF creation
    const gifConfig = {
      workers: 2,
      quality: 10,
      width: container.offsetWidth,
      height: container.offsetHeight,
      workerScript: 'https://cdn.jsdelivr.net/npm/gif.js/dist/gif.worker.js',
    };

    // Create a new GIF instance
    const gif = new GIF(gifConfig);

    // Number of frames to capture (more frames = smoother animation but larger file)
    const frameCount = 10;
    const frameDelay = 200; // Milliseconds between frames

    // Capture frames
    for (let i = 0; i < frameCount; i++) {
      // Capture the current state of the container
      const canvas = await html2canvas(container, {
        allowTaint: true,
        useCORS: true,
        logging: false,
        backgroundColor: null,
      });

      // Add the frame to the GIF
      const frameOptions: GifFrameOptions = {
        delay: frameDelay,
        copy: true,
      };
      
      gif.addFrame(canvas, frameOptions);
      
      // Wait a bit before capturing the next frame to catch any animations
      if (i < frameCount - 1) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    // Return a Promise that resolves with the data URL when rendering is complete
    return new Promise((resolve, reject) => {
      gif.on('finished', (blob: Blob) => {
        // Convert blob to data URL
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      
      gif.on('error', (error: Error) => {
        reject(error);
      });
      
      // Start rendering the GIF
      gif.render();
    });
  } catch (error) {
    console.error('Error creating GIF:', error);
    throw error;
  }
}
