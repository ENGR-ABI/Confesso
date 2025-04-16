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
    // Ensure the container exists and has dimensions
    if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) {
      throw new Error('Invalid container element or container has no dimensions');
    }

    // First, capture a static image of the container
    console.log('Starting document clone with size', container.offsetWidth, container.offsetHeight);
    
    const canvas = await html2canvas(container, {
      allowTaint: true,
      useCORS: true,
      logging: true,
      backgroundColor: "#1e0b41", // Deep purple background to match app theme
      scale: 2, // Higher quality
    });
    
    // Get canvas data
    const imageData = canvas.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height);
    
    if (!imageData) {
      throw new Error('Failed to get image data from canvas');
    }
    
    // Configuration for GIF creation
    const gifConfig = {
      workers: 2,
      quality: 10,
      width: canvas.width,
      height: canvas.height,
      workerScript: '/gif.worker.js', // Use local worker path instead of CDN
    };

    // Create a new GIF instance
    const gif = new GIF(gifConfig);
    
    // Add a single frame with the captured image
    // (we're only doing a simple animated arrow effect)
    const frameOptions: GifFrameOptions = {
      delay: 200,
      copy: true,
    };
    
    gif.addFrame(canvas, frameOptions);
    
    // Return a Promise that resolves with the data URL when rendering is complete
    return new Promise((resolve, reject) => {
      gif.on('finished', (blob: Blob) => {
        // Convert blob to data URL
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (e) => {
          console.error('FileReader error:', e);
          reject(new Error('Failed to read GIF blob'));
        };
        reader.readAsDataURL(blob);
      });
      
      gif.on('error', (error: Error) => {
        console.error('GIF generation error:', error);
        reject(error);
      });
      
      // Start rendering the GIF
      console.log('Starting GIF render');
      gif.render();
    });
  } catch (error) {
    console.error('Error creating GIF:', error);
    throw error;
  }
}
