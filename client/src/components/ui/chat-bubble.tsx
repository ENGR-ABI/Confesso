import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatBubbleProps {
  message: string;
  isOutgoing?: boolean;
  avatarUrl?: string | null;
  username?: string;
  className?: string;
}

export function ChatBubble({
  message,
  isOutgoing = false,
  avatarUrl,
  username = "Anon",
  className,
}: ChatBubbleProps) {
  const initials = username ? username.charAt(0).toUpperCase() : "A";
  
  return (
    <div
      className={cn(
        "flex w-full max-w-md items-start gap-2 mb-4",
        isOutgoing ? "ml-auto flex-row-reverse" : "",
        className
      )}
    >
      <Avatar className="h-8 w-8 flex-shrink-0">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt={username} />
        ) : null}
        <AvatarFallback
          className={cn(
            isOutgoing ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
          )}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "flex-1 rounded-lg px-4 py-2 text-sm",
          isOutgoing
            ? "rounded-br-none bg-gradient-to-r from-pink-500 to-blue-500 text-white"
            : "rounded-bl-none bg-gradient-to-r from-blue-500 to-pink-500 text-white"
        )}
      >
        {message}
      </div>
    </div>
  );
}