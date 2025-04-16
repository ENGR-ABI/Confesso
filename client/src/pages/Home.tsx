import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  MessageCircleIcon, 
  PlusCircleIcon, 
  ShareIcon, 
  DownloadIcon, 
  SmartphoneIcon, 
  ArrowDownIcon
} from "lucide-react";
import anonymImage from "@assets/anonym.png";
import chatBubbleLeft from "@assets/chat-bubble-left.png";
import chatBubbleRight from "@assets/chat-bubble-right.png";
import meCompressedImage from "@assets/me-compressed.png";
import arrowGif from "@assets/Arrow.gif";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Hero Section with improved contrast */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-indigo-400 mb-4">
          Confesso
        </h1>
        <p className="text-xl font-medium text-white max-w-2xl mx-auto">
          Create anonymous questions and get honest replies from friends
        </p>
      </div>

      {/* Features Section with improved contrast */}
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto mb-16">
        <Card className="flex-1 bg-white/10 backdrop-blur-sm border-white/10 p-6 rounded-xl shadow-lg hover:shadow-pink-500/10 transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-4">
              <img 
                src={anonymImage} 
                alt="Anonymous mask" 
                className="w-full h-auto" 
              />
            </div>
            <h2 className="text-xl font-semibold mb-3 text-white">Stay Anonymous</h2>
            <p className="text-white/90">
              Create questions anonymously and share them with friends. No sign-up required.
            </p>
          </div>
        </Card>

        <Card className="flex-1 bg-white/10 backdrop-blur-sm border-white/10 p-6 rounded-xl shadow-lg hover:shadow-purple-500/10 transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-4 flex justify-center">
              <div className="relative">
                <img 
                  src={chatBubbleLeft} 
                  alt="Chat bubbles" 
                  className="w-10 h-auto absolute -left-2" 
                />
                <img 
                  src={chatBubbleRight} 
                  alt="Chat bubbles" 
                  className="w-10 h-auto absolute -right-2" 
                />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-3 text-white">Get Honest Replies</h2>
            <p className="text-white/90">
              Receive anonymous answers to your questions. People can express themselves freely.
            </p>
          </div>
        </Card>

        <Card className="flex-1 bg-white/10 backdrop-blur-sm border-white/10 p-6 rounded-xl shadow-lg hover:shadow-blue-500/10 transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-4 flex justify-center">
              <div className="relative">
                <ShareIcon className="w-14 h-14 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-3 text-white">Share Anywhere</h2>
            <p className="text-white/90">
              Share your question on social media or via direct messages. Download as image for sharing.
            </p>
          </div>
        </Card>
      </div>

      {/* CTA Button with improved contrast */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-20">
        <Button
          onClick={() => setLocation("/create")}
          size="lg"
          className="bg-gradient-to-r from-pink-400 to-indigo-500 hover:from-pink-500 hover:to-indigo-600 text-white font-medium px-8 py-6 text-lg rounded-full shadow-lg"
        >
          <PlusCircleIcon className="mr-2 h-5 w-5" />
          Create Question
        </Button>
      </div>

      {/* How It Works Section with improved contrast */}
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-lg mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">How It Works</h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-pink-500/20 rounded-full mb-4">
              <PlusCircleIcon className="h-8 w-8 text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">1. Create</h3>
            <p className="text-white/90">
              Create your anonymous question and customize your profile.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-purple-500/20 rounded-full mb-4">
              <ShareIcon className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">2. Share</h3>
            <p className="text-white/90">
              Share your question link with friends on social media or messages.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-blue-500/20 rounded-full mb-4">
              <MessageCircleIcon className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">3. Receive</h3>
            <p className="text-white/90">
              Get anonymous replies and download your conversation as image.
            </p>
          </div>
        </div>
      </div>

      {/* New Download Section */}
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-900/50 to-pink-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-lg mb-20">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Coming Soon to Mobile
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Get ready for the Confesso mobile experience! Native apps for iOS and Android are in development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center bg-white/10 p-4 rounded-lg">
                <SmartphoneIcon className="h-8 w-8 mr-3 text-indigo-400" />
                <div>
                  <h3 className="text-lg font-medium text-white">iOS App</h3>
                  <p className="text-white/90">Coming Soon</p>
                </div>
              </div>
              <div className="flex items-center bg-white/10 p-4 rounded-lg">
                <SmartphoneIcon className="h-8 w-8 mr-3 text-pink-400" />
                <div>
                  <h3 className="text-lg font-medium text-white">Android App</h3>
                  <p className="text-white/90">Coming Soon</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <ArrowDownIcon className="h-6 w-6 mr-2 text-white" />
              <p className="text-white font-medium">Join the waitlist</p>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-white text-indigo-900 hover:bg-white/90 shadow-md"
                onClick={() => window.open('mailto:waitlist@confesso.com?subject=iOS Waitlist')}
              >
                iOS Waitlist
              </Button>
              <Button
                className="bg-white text-pink-900 hover:bg-white/90 shadow-md"
                onClick={() => window.open('mailto:waitlist@confesso.com?subject=Android Waitlist')}
              >
                Android Waitlist
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <img 
                src={meCompressedImage} 
                alt="Mobile preview" 
                className="max-w-[250px] rounded-xl border-4 border-white/20 shadow-lg" 
              />
              <img 
                src={arrowGif} 
                alt="Download arrow" 
                className="absolute -bottom-10 -right-10 w-20 h-auto" 
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 text-center text-white/80 text-sm">
        <p>© {new Date().getFullYear()} Confesso. All rights reserved.</p>
      </footer>
    </div>
  );
}
