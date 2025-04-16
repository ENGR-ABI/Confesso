import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CopyIcon, ShareIcon, DownloadIcon } from "lucide-react";
import html2canvas from "html2canvas";
import AnonymousCardTemplate from "./AnonymousCardTemplate";

interface ShareQuestionProps {
  questionId: string;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export default function ShareQuestion({ questionId, containerRef }: ShareQuestionProps) {
  const { toast } = useToast();
  const [shareUrl, setShareUrl] = useState("");
  const [isGeneratingGif, setIsGeneratingGif] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [gifDataUrl, setGifDataUrl] = useState<string | null>(null);

  useEffect(() => {
    // Generate share URL based on current location
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/q/${questionId}`;
    setShareUrl(url);
  }, [questionId]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share this link to receive anonymous responses.",
      });
    } catch (error) {
      console.error("Failed to copy:", error);
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    // Use the Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Answer my anonymous question",
          text: "Send me an anonymous message!",
          url: shareUrl,
        });
        toast({
          title: "Shared successfully!",
          description: "Your question has been shared.",
        });
      } catch (error) {
        console.error("Error sharing:", error);
        // Fall back to copying to clipboard if sharing was cancelled
        copyToClipboard();
      }
    } else {
      // Fall back to copying to clipboard
      copyToClipboard();
    }
  };

  const downloadAsImage = async () => {
    if (!containerRef?.current) {
      toast({
        title: "Error",
        description: "Could not generate image. Container not found.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingImage(true);
    try {
      const canvas = await html2canvas(containerRef.current, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: "#1e0b41", // Deep purple background
        scale: 2, // Higher quality
      });
      
      const imageUrl = canvas.toDataURL("image/png");
      
      // Create a download link
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `anonymous-question-${questionId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Downloaded!",
        description: "Your conversation image has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Reference to the template container
  const templateRef = useRef<HTMLDivElement>(null);
  
  // Get question data from the container
  const getQuestionData = () => {
    if (!containerRef?.current) return null;
    
    // Extract text from the container
    const questionElement = containerRef.current.querySelector('h2, h3');
    const repliesElements = containerRef.current.querySelectorAll('.chat-bubble');
    
    // Default data if we can't extract from DOM
    const questionData = {
      question: questionElement?.textContent || "Anonymous Question",
      title: questionElement?.textContent || "Anonymous Question",
      respond: repliesElements.length > 0 ? repliesElements[0].textContent : "No replies yet",
      answer: repliesElements.length > 1 ? repliesElements[1].textContent : "Add your reply"
    };
    
    return questionData;
  };

  const downloadAsGif = async () => {
    setIsGeneratingGif(true);
    
    try {
      // Render the template first
      const questionData = getQuestionData();
      
      // Create a temporary div to render our template
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.top = '-9999px';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);
      
      // Create a React element
      const template = document.createElement('div');
      tempDiv.appendChild(template);
      
      // Render the template
      const templateContainer = document.createElement('div');
      templateContainer.id = 'captureDiv';
      templateContainer.style.backgroundColor = "#26065d";
      templateContainer.style.position = "relative";
      templateContainer.style.alignContent = "center";
      templateContainer.style.width = "440px";
      templateContainer.style.height = "956px";
      templateContainer.style.padding = "0px 20px";
      
      // Add content to the template container based on questionData
      templateContainer.innerHTML = `
        <div style="position:relative;width:100%;background:linear-gradient(154deg, rgba(51, 50, 247, 1) 0%, rgba(236, 19, 116, 1) 100%);border-radius:40px;box-shadow:6px 6px 10px #00000040;padding:2px;margin-bottom:80px;">
          <div style="position:relative;width:100%;border-radius:40px;">
            <!-- Top Gradient Section -->
            <div style="padding:40px 30px;position:relative;border-radius:40px 40px 0px 0px;background:linear-gradient(154deg, rgba(51, 50, 247, 1) 0%, rgba(236, 19, 116, 1) 100%);">
              <div style="position:relative;margin-top:-1px;text-shadow:0px 0px 10px #fe0d8c;font-family:'Inter-Bold',Helvetica,sans-serif;font-weight:700;color:#ffffff;font-size:22px;text-align:center;letter-spacing:0;line-height:normal;">
                ${questionData?.question || "Anonymous Question"}
              </div>
            </div>
            
            <!-- Chats Section -->
            <div style="padding:26px 19px;background-color:#2f0970;border-radius:0px 0px 40px 40px;">
              <div style="position:relative;font-family:'Inter-Bold',Helvetica,sans-serif;font-weight:normal;color:#ffffff;font-size:18px;text-align:center;letter-spacing:0;line-height:normal;margin:0;">
                <div style="display:flex;align-items:center;justify-content:space-between;flex-direction:column;gap:30px;">
                  <!-- Answer chat -->
                  <div style="display:flex;align-items:end;justify-content:space-between;flex-direction:row;gap:10px">
                    <div style="background:linear-gradient(154deg, rgba(51, 50, 247, 1) 0%, rgba(236, 19, 116, 1) 100%);padding:2px;border-radius:100px;">
                      <img src="/anonym.png" alt="Ellipse" width="104" height="104" style="object-fit:cover;border-radius:100px;" />
                    </div>
                    <div style="background-image:url(/chat-bubble-left.png);background-size:100% 100%;text-align:left;background-repeat:no-repeat;background-position:center;padding:12px 10px 12px 30px;">
                      ${questionData?.respond || "How are you?"}
                    </div>
                  </div>
                  
                  <!-- Response chat -->
                  <div style="display:flex;align-items:end;justify-content:space-between;flex-direction:row;gap:10px">
                    <div style="background-image:url(/chat-bubble-right.png);background-size:100% 100%;text-align:left;background-repeat:no-repeat;background-position:center;padding:12px 10px 12px 30px;">
                      ${questionData?.answer || "I'm doing great!"}
                    </div>
                    <div style="background:linear-gradient(154deg, rgba(51, 50, 247, 1) 0%, rgba(236, 19, 116, 1) 100%);padding:2px;border-radius:100px;">
                      <img src="/me-compressed.png" alt="Ellipse" width="104" height="104" style="object-fit:cover;border-radius:100px;transform:rotateX(10deg)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Bottom Arrow -->
            <img src="/Arrow.gif" alt="Arrow" style="position:absolute;bottom:-100px;left:50%;transform:translateX(-50%);width:60px;height:auto;" />
          </div>
        </div>
      `;
      
      tempDiv.appendChild(templateContainer);
      
      // Capture it with html2canvas
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait for rendering
      
      const canvas = await html2canvas(templateContainer, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: "#26065d",
        scale: 2,
        logging: true,
      });
      
      // Get data URL
      const dataUrl = canvas.toDataURL("image/png");
      setGifDataUrl(dataUrl);
      
      // Create a download link
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `confesso-conversation-${questionId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      document.body.removeChild(tempDiv);
      
      toast({
        title: "Downloaded!",
        description: "Your animated conversation has been captured.",
      });
    } catch (error) {
      console.error("Error generating conversation card:", error);
      toast({
        title: "Error",
        description: "Failed to generate conversation card. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingGif(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">
        Share Your Question
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            value={shareUrl}
            readOnly
            className="bg-white/20 text-white border-0"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            className="flex-shrink-0 bg-white/20 border-0 text-white hover:bg-white/30"
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleShare}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
          >
            <ShareIcon className="mr-2 h-4 w-4" />
            Share Link
          </Button>
          
          <Button
            onClick={downloadAsImage}
            disabled={isGeneratingImage}
            variant="outline"
            className="bg-white/20 border-0 text-white hover:bg-white/30"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            {isGeneratingImage ? "Generating..." : "Download Image"}
          </Button>
          
          <Button
            onClick={downloadAsGif}
            disabled={isGeneratingGif}
            className="col-span-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
          >
            <span className="mr-2">📸</span>
            {isGeneratingGif ? "Capturing..." : "Capture Conversation"}
          </Button>
        </div>
      </div>
    </Card>
  );
}