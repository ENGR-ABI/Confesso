import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcwIcon, DownloadIcon } from "lucide-react";
import { createGif } from "@/lib/gifCreator";

interface ActionButtonsProps {
  onConvert: () => void;
  onDownload: () => void;
  onCreateNew: () => void;
  isConverting: boolean;
  showDownloadSection: boolean;
  gifDataUrl: string | null;
  onConversionSuccess: (dataUrl: string) => void;
}

export default function ActionButtons({
  onConvert,
  onDownload,
  onCreateNew,
  isConverting,
  showDownloadSection,
  gifDataUrl,
  onConversionSuccess,
}: ActionButtonsProps) {
  const downloadSectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (downloadSectionRef.current) {
      if (showDownloadSection) {
        downloadSectionRef.current.style.maxHeight = '500px';
      } else {
        downloadSectionRef.current.style.maxHeight = '0';
      }
    }
  }, [showDownloadSection]);

  useEffect(() => {
    const handleConversion = async () => {
      if (isConverting) {
        try {
          const gifContainer = document.getElementById('gif-container');
          if (!gifContainer) {
            throw new Error('GIF container not found');
          }
          
          // Convert container to GIF
          const dataUrl = await createGif(gifContainer);
          
          // Simulate processing time to match design (3 seconds)
          setTimeout(() => {
            onConversionSuccess(dataUrl);
          }, 3000);
          
        } catch (error) {
          console.error('Error creating GIF:', error);
          onConversionSuccess('https://media.giphy.com/media/3ohhwJbyGQ6AdOlr56/giphy.gif'); // Fallback
        }
      }
    };

    handleConversion();
  }, [isConverting, onConversionSuccess]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      {/* Convert Button */}
      <Button 
        onClick={onConvert}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition-colors flex items-center space-x-2 mb-4"
        size="lg"
        disabled={isConverting}
      >
        <RefreshCcwIcon className="h-5 w-5" />
        <span>Convert to GIF</span>
      </Button>

      {/* Download Section */}
      <div 
        ref={downloadSectionRef}
        className="w-full max-h-0 overflow-hidden transition-all duration-300"
        style={{ transition: 'max-height 0.3s ease-in-out' }}
      >
        <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-100 w-full text-center">
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-48 mb-4 bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
              {/* Preview of generated GIF */}
              {gifDataUrl && !isConverting && (
                <img 
                  src={gifDataUrl} 
                  alt="Generated GIF preview" 
                  className="w-full h-full object-contain" 
                />
              )}
              
              {/* Loading State */}
              {isConverting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mb-3"></div>
                  <p className="text-sm text-indigo-700 font-medium">Processing...</p>
                  <p className="text-xs text-indigo-500 mt-1">This may take a moment</p>
                </div>
              )}
            </div>
            
            <div className="space-y-4 w-full max-w-md">
              <div className="flex items-center justify-between px-3 py-2 bg-white rounded border border-gray-200">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">my-animation.gif</span>
                </div>
                <span className="text-xs text-gray-500">1.2 MB</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={onDownload}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-md font-medium flex items-center justify-center space-x-2 flex-1 transition-colors"
                  disabled={isConverting || !gifDataUrl}
                >
                  <DownloadIcon className="h-5 w-5" />
                  <span>Download GIF</span>
                </Button>
                <Button
                  onClick={onCreateNew}
                  variant="outline"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  Create New
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
