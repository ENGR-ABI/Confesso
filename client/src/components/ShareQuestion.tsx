import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CopyIcon, ShareIcon, DownloadIcon } from "lucide-react";
import html2canvas from "html2canvas";
import { createGif } from "@/lib/gifCreator";

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

  const downloadAsGif = async () => {
    if (!containerRef?.current) {
      toast({
        title: "Error",
        description: "Could not generate GIF. Container not found.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingGif(true);
    try {
      const dataUrl = await createGif(containerRef.current);
      setGifDataUrl(dataUrl);
      
      // Create a download link
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `anonymous-question-${questionId}.gif`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Downloaded!",
        description: "Your conversation GIF has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating GIF:", error);
      toast({
        title: "Error",
        description: "Failed to generate GIF. Please try again.",
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
            <span className="mr-2">🎬</span>
            {isGeneratingGif ? "Generating GIF..." : "Download as GIF"}
          </Button>
        </div>
      </div>
    </Card>
  );
}