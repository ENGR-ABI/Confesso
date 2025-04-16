import { Card } from "@/components/ui/card";
import { EditIcon, TrashIcon, PlayIcon, PauseIcon } from "lucide-react";
import { forwardRef } from "react";

const GifContainer = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <Card id="gif-container" ref={ref} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-6">
          {/* Container Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">My Animated Content</h2>
            <div className="flex space-x-2">
              <button className="p-1 rounded-md hover:bg-gray-100">
                <EditIcon className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-1 rounded-md hover:bg-gray-100">
                <TrashIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Animated GIF Display */}
            <div className="w-full md:w-1/2 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
              {/* Sample GIF Image */}
              <img 
                src="https://media.giphy.com/media/3ohhwJbyGQ6AdOlr56/giphy.gif" 
                alt="Animated content" 
                className="w-full h-64 object-cover" 
              />
              
              {/* Animated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 animate-pulse-slow"></div>
              
              {/* Control Icons */}
              <div className="absolute bottom-3 right-3 flex space-x-2">
                <button className="p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm">
                  <PlayIcon className="h-4 w-4 text-gray-700" />
                </button>
                <button className="p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm">
                  <PauseIcon className="h-4 w-4 text-gray-700" />
                </button>
              </div>
            </div>
            
            {/* Static Content */}
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Project Overview</h3>
              <p className="text-gray-600">
                This is a sample animated content that will be converted to a GIF. 
                You can add any content here such as text, icons, or images.
              </p>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Created: April 15, 2023</span>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center space-x-1 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">Animation Status: Ready</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">Animation</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-md">Interactive</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md">Responsive</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});

GifContainer.displayName = "GifContainer";

export default GifContainer;
