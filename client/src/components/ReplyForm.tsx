import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReplySchema } from "@/shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addReply } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { SendIcon } from "lucide-react";

interface ReplyFormProps {
  questionId: string;
  onSuccess?: () => void;
}

export default function ReplyForm({ questionId, onSuccess }: ReplyFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(createReplySchema),
    defaultValues: {
      text: "",
      username: "",
      avatarUrl: null as string | null,
    },
  });

  const onSubmit = async (data: {
    text: string;
    username: string;
    avatarUrl: string | null;
  }) => {
    setIsSubmitting(true);
    try {
      await addReply(
        questionId,
        data.text,
        data.username,
        data.avatarUrl
      );
      
      form.reset();
      setAvatarPreview(null);
      
      toast({
        title: "Reply sent!",
        description: "Your anonymous reply has been added.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      toast({
        title: "Error",
        description: "Failed to send your reply. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setAvatarPreview(dataUrl);
      form.setValue("avatarUrl", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">
        Send Anonymous Reply
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-white/50">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} alt="Avatar preview" />
                ) : null}
                <AvatarFallback className="bg-purple-100 text-purple-600">
                  {form.watch("username")?.charAt(0)?.toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload-reply"
                className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-600"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                <input
                  id="avatar-upload-reply"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        className="bg-white/20 text-white border-0 placeholder:text-white/60"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-rose-200" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Type your reply here..."
                    className="bg-white/20 text-white border-0 placeholder:text-white/60 min-h-20 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-rose-200" />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white"
          >
            {isSubmitting ? "Sending..." : "Send Reply"}
            <SendIcon className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </Card>
  );
}