import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircleIcon, PlusCircleIcon, ShareIcon } from "lucide-react";
import anonymImage from "@assets/anonym.png";
import chatBubbleLeft from "@assets/chat-bubble-left.png";
import chatBubbleRight from "@assets/chat-bubble-right.png";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 mb-4">
          Anonymous Messaging
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Create anonymous questions and get honest replies from friends
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto mb-16">
        <Card className="flex-1 bg-white/10 backdrop-blur-sm border-white/10 p-6 rounded-xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-4">
              <img 
                src={anonymImage} 
                alt="Anonymous mask" 
                className="w-full h-auto" 
              />
            </div>
            <h2 className="text-xl font-semibold mb-3">Stay Anonymous</h2>
            <p className="text-white/70">
              Create questions anonymously and share them with friends. No sign-up required.
            </p>
          </div>
        </Card>

        <Card className="flex-1 bg-white/10 backdrop-blur-sm border-white/10 p-6 rounded-xl">
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
            <h2 className="text-xl font-semibold mb-3">Get Honest Replies</h2>
            <p className="text-white/70">
              Receive anonymous answers to your questions. People can express themselves freely.
            </p>
          </div>
        </Card>

        <Card className="flex-1 bg-white/10 backdrop-blur-sm border-white/10 p-6 rounded-xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-4 flex justify-center">
              <div className="relative">
                <ShareIcon className="w-14 h-14 text-white/80" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-3">Share Anywhere</h2>
            <p className="text-white/70">
              Share your question on social media or via direct messages. Download as image or GIF.
            </p>
          </div>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-20">
        <Button
          onClick={() => setLocation("/create")}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-full"
        >
          <PlusCircleIcon className="mr-2 h-5 w-5" />
          Create Question
        </Button>
      </div>

      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-pink-500/20 rounded-full mb-4">
              <PlusCircleIcon className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">1. Create</h3>
            <p className="text-white/70">
              Create your anonymous question and customize your profile.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-purple-500/20 rounded-full mb-4">
              <ShareIcon className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">2. Share</h3>
            <p className="text-white/70">
              Share your question link with friends on social media or messages.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-blue-500/20 rounded-full mb-4">
              <MessageCircleIcon className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">3. Receive</h3>
            <p className="text-white/70">
              Get anonymous replies and download your conversation as image or GIF.
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-20 text-center text-white/50 text-sm">
        <p>© {new Date().getFullYear()} Anonymous Messages. All rights reserved.</p>
      </footer>
    </div>
  );
}
