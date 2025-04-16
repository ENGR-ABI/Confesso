import { useState } from "react";
import { useLocation } from "wouter";
import CreateQuestionForm from "@/components/CreateQuestionForm";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function CreateQuestion() {
  const [, setLocation] = useLocation();
  const [createdQuestionId, setCreatedQuestionId] = useState<string | null>(null);
  
  const handleQuestionCreated = (questionId: string) => {
    setCreatedQuestionId(questionId);
    // Redirect to the question view page after a short delay
    setTimeout(() => {
      setLocation(`/q/${questionId}`);
    }, 1000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        className="mb-6 text-white hover:text-white/80 hover:bg-white/10"
        onClick={() => setLocation("/")}
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
      
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 mb-3">
          Create Your Anonymous Question
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Ask anything and share the link to receive anonymous replies
        </p>
      </div>
      
      <CreateQuestionForm onSuccess={handleQuestionCreated} />
    </div>
  );
}