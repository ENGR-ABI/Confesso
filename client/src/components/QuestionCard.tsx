import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Question } from "@shared/schema";
import { ChatBubble } from "@/components/ui/chat-bubble";

interface QuestionCardProps {
  question: Question | {
    text: string;
    username: string;
    avatarUrl?: string | null;
  };
  replies?: Array<{
    text: string;
    username: string;
    avatarUrl?: string | null;
  }>;
  showReplies?: boolean;
  className?: string;
}

export function QuestionCard({
  question,
  replies = [],
  showReplies = true,
  className,
}: QuestionCardProps) {
  const username = question.username || "Anonymous";
  const initials = username.charAt(0).toUpperCase();

  return (
    <Card className={`bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-xl overflow-hidden shadow-xl max-w-md mx-auto ${className}`}>
      {/* Header with username and avatar */}
      {!showReplies && (
        <div className="p-4 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              {question.avatarUrl ? (
                <AvatarImage src={question.avatarUrl} alt={username} />
              ) : null}
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-white text-lg">{username}</span>
          </div>
        </div>
      )}

      {/* Question */}
      <div className="px-6 py-4">
        {showReplies ? (
          // Show question as header when showing replies
          <h2 className="text-xl font-semibold text-center mb-6">{question.text}</h2>
        ) : (
          // Show question as chat bubble when not showing replies
          <div className="text-center py-4">
            <p className="text-xl font-semibold">{question.text}</p>
          </div>
        )}

        {/* Replies */}
        {showReplies && replies.length > 0 && (
          <div className="mt-6 space-y-3">
            {replies.map((reply, index) => (
              <ChatBubble
                key={index}
                message={reply.text}
                isOutgoing={index % 2 === 1}
                avatarUrl={reply.avatarUrl}
                username={reply.username}
              />
            ))}
          </div>
        )}
      </div>

      {/* Decorative element at bottom */}
      <div className="w-full h-10 flex justify-center">
        <img 
          src="/assets/Arrow.gif" 
          alt="Decorative arrow" 
          className="h-10 w-auto"
        />
      </div>
    </Card>
  );
}