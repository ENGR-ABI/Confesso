import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ImageIcon className="h-8 w-8 text-indigo-500" />
          <h1 className="text-xl font-bold text-gray-800">GIFMaker</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-indigo-500 transition-colors font-medium">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-indigo-500 transition-colors font-medium">
            Examples
          </a>
          <a href="#" className="text-gray-600 hover:text-indigo-500 transition-colors font-medium">
            Docs
          </a>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
            Sign In
          </Button>
        </div>
        
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
}
