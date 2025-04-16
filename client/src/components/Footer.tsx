import { ImageIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <ImageIcon className="h-6 w-6 text-indigo-500 mr-2" />
            <span className="text-gray-700 font-medium">GIFMaker</span>
          </div>
          <div className="flex space-x-4 text-sm text-gray-600">
            <a href="#" className="hover:text-indigo-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Help</a>
            <a href="#" className="hover:text-indigo-500 transition-colors">Contact</a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} GIFMaker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
