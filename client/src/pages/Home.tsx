import { useState } from "react";
import Navbar from "@/components/Navbar";
import GifContainer from "@/components/GifContainer";
import ActionButtons from "@/components/ActionButtons";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [isConverting, setIsConverting] = useState(false);
  const [showDownloadSection, setShowDownloadSection] = useState(false);
  const [gifDataUrl, setGifDataUrl] = useState<string | null>(null);

  const handleConversionSuccess = (dataUrl: string) => {
    setGifDataUrl(dataUrl);
    setIsConverting(false);
    toast({
      title: "Success!",
      description: "Your GIF has been created successfully.",
      variant: "default",
    });
  };

  const handleConversionStart = () => {
    setIsConverting(true);
    setShowDownloadSection(true);
  };

  const handleDownload = () => {
    if (!gifDataUrl) return;
    
    // Create a download link
    const link = document.createElement("a");
    link.href = gifDataUrl;
    link.download = "my-animation.gif";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Downloaded!",
      description: "Your GIF has been downloaded.",
      variant: "default",
    });
  };

  const handleCreateNew = () => {
    setShowDownloadSection(false);
    setTimeout(() => {
      setGifDataUrl(null);
      setIsConverting(false);
    }, 300);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex-1">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Convert Container to GIF
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create and download animated GIFs from your content with just one click
          </p>
        </div>

        <GifContainer />

        <ActionButtons 
          onConvert={handleConversionStart}
          onDownload={handleDownload}
          onCreateNew={handleCreateNew}
          isConverting={isConverting}
          showDownloadSection={showDownloadSection}
          gifDataUrl={gifDataUrl}
          onConversionSuccess={handleConversionSuccess}
        />

        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
}
