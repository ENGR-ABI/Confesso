import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getQuestion, getReplies } from "@/lib/firebase";
import { QuestionCard } from "@/components/QuestionCard";
import ReplyForm from "@/components/ReplyForm";
import ShareQuestion from "@/components/ShareQuestion";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ViewQuestion() {
  const { questionId } = useParams<{ questionId: string }>();
  const [, setLocation] = useLocation();
  const [replyAdded, setReplyAdded] = useState(false);
  const questionCardRef = useRef<HTMLDivElement>(null);
  
  // Fetch question data
  const { data: question, isLoading: isLoadingQuestion, error } = useQuery({
    queryKey: ['question', questionId],
    queryFn: () => getQuestion(questionId),
    staleTime: 1000 * 60, // 1 minute
  });
  
  // Fetch replies
  const { 
    data: replies, 
    isLoading: isLoadingReplies,
    refetch: refetchReplies 
  } = useQuery({
    queryKey: ['replies', questionId],
    queryFn: () => getReplies(questionId),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!questionId
  });
  
  // Refetch replies when a new reply is added
  useEffect(() => {
    if (replyAdded) {
      refetchReplies();
      setReplyAdded(false);
    }
  }, [replyAdded, refetchReplies]);
  
  const handleReplySuccess = () => {
    setReplyAdded(true);
  };
  
  if (isLoadingQuestion) {
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
        
        <div className="max-w-md mx-auto">
          <Skeleton className="h-64 w-full bg-white/10 rounded-xl mb-4" />
          <Skeleton className="h-10 w-32 bg-white/10 rounded-lg mb-2" />
          <Skeleton className="h-20 w-full bg-white/10 rounded-lg" />
        </div>
      </div>
    );
  }
  
  if (error || !question) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <Button
          variant="ghost"
          className="mb-6 text-white hover:text-white/80 hover:bg-white/10"
          onClick={() => setLocation("/")}
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <h2 className="text-2xl font-bold mb-4">Question Not Found</h2>
        <p className="mb-6">This question may have been removed or the link is incorrect.</p>
        
        <Button onClick={() => setLocation("/create")}>
          Create Your Own Question
        </Button>
      </div>
    );
  }
  
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
      
      <div className="max-w-md mx-auto mb-10" ref={questionCardRef}>
        <QuestionCard 
          question={question} 
          replies={replies} 
          showReplies={true} 
        />
      </div>
      
      <div className="grid gap-6 max-w-md mx-auto">
        <ReplyForm questionId={questionId} onSuccess={handleReplySuccess} />
        
        <ShareQuestion questionId={questionId} containerRef={questionCardRef} />
      </div>
    </div>
  );
}