import html2canvas from 'html2canvas';
import GIF from 'gif.js';

type GifFrameOptions = {
  delay: number;
  copy: boolean;
};

// Function to load an image and return it as an HTMLImageElement
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

// Function to create animation frames for the arrow
async function createArrowAnimation(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, arrowGifSrc: string): Promise<void> {
  // Load the arrow GIF
  const arrowImg = await loadImage(arrowGifSrc);
  
  // Calculate position for the arrow (centered at bottom)
  const arrowX = (canvas.width / 2) - 30; // Center the 60px wide arrow
  const arrowY = canvas.height - 80; // Position near the bottom
  
  // Draw the arrow
  ctx.drawImage(arrowImg, arrowX, arrowY, 60, 60);
}

/**
 * Creates a GIF from the provided container element with an animated arrow
 * @param container The DOM element to convert to a GIF
 * @returns Promise<string> A data URL of the generated GIF
 */
export async function createGif(container: HTMLElement): Promise<string> {
  try {
    // Ensure the container exists and has dimensions
    if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) {
      throw new Error('Invalid container element or container has no dimensions');
    }

    console.log('Starting document clone with size', container.offsetWidth, container.offsetHeight);
    
    // Capture the base container without animation, but don't include the arrow element
    // We'll manually add the arrow animation in the frames
    const arrowElement = container.querySelector('img[src="/Arrow.gif"]');
    let arrowDisplay = 'block';
    
    // Hide the arrow temporarily so we can add it manually to each frame
    if (arrowElement) {
      arrowDisplay = (arrowElement as HTMLElement).style.display;
      (arrowElement as HTMLElement).style.display = 'none';
    }
    
    // Capture the static content
    const canvas = await html2canvas(container, {
      allowTaint: true,
      useCORS: true,
      logging: true,
      backgroundColor: "#26065d", // Deep purple background to match design
      scale: 2, // Higher quality
    });
    
    // Restore the arrow visibility
    if (arrowElement) {
      (arrowElement as HTMLElement).style.display = arrowDisplay;
    }
    
    // Configuration for GIF creation
    const gifConfig = {
      workers: 2,
      quality: 10,
      width: canvas.width,
      height: canvas.height,
      workerScript: '/gif.worker.js',
      background: '#26065d',
      transparent: 'rgba(0,0,0,0)',
    };

    // Create a new GIF instance
    const gif = new GIF(gifConfig);
    
    // Create frames for animation
    const numFrames = 6; // Number of animation frames
    const canvasContext = canvas.getContext('2d');
    
    if (!canvasContext) {
      throw new Error('Failed to get canvas context');
    }
    
    // Base frame options (longer for the first frame)
    const frameOptions: GifFrameOptions = {
      delay: 200,
      copy: true,
    };
    
    // Add the first frame (static base)
    gif.addFrame(canvas, { ...frameOptions, delay: 500 });
    
    // Create multiple frames for arrow animation
    // We'll just create some variation in the arrow position to simulate movement
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d')!;
    
    // Define arrow positions for animation (slightly moving up and down)
    const arrowPositions = [0, -3, -5, -3, 0, 3, 5, 3, 0];
    
    // Create and add animation frames
    for (let i = 0; i < arrowPositions.length; i++) {
      // Start with the base image
      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.drawImage(canvas, 0, 0);
      
      // Draw the arrow at this position in the animation
      const arrowX = (tempCanvas.width / 2) - 30;
      const arrowY = (tempCanvas.height - 80) + arrowPositions[i];
      
      // Load and draw the arrow
      const arrowImage = await loadImage('/Arrow.gif');
      tempCtx.drawImage(arrowImage, arrowX, arrowY, 60, 60);
      
      // Add this frame
      gif.addFrame(tempCanvas, { delay: 150, copy: true });
    }
    
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
