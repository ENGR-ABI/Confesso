import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createQuestionSchema } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createQuestion } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { ArrowRightIcon } from "lucide-react";

interface CreateQuestionFormProps {
  onSuccess?: (questionId: string) => void;
}

export default function CreateQuestionForm({ onSuccess }: CreateQuestionFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(createQuestionSchema),
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
      const result = await createQuestion(
        data.text,
        data.username,
        data.avatarUrl
      );
      
      toast({
        title: "Question created!",
        description: "Share the link with friends to get anonymous replies.",
      });
      
      if (onSuccess && result.id) {
        onSuccess(result.id);
      }
    } catch (error) {
      console.error("Error creating question:", error);
      toast({
        title: "Error",
        description: "Failed to create your question. Please try again.",
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
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-xl shadow-xl">
      <h2 className="text-xl font-bold text-white text-center mb-6">
        Create Your Anonymous Question
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-white">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} alt="Avatar preview" />
                ) : null}
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                  {form.watch("username")?.charAt(0)?.toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                <input
                  id="avatar-upload"
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
                    <FormLabel className="text-white">Your Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name or nickname"
                        className="bg-white/10 text-white border-white/20 placeholder:text-white/50"
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
                <FormLabel className="text-white">Your Question</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ask anything you want to know..."
                    className="bg-white/10 text-white border-white/20 placeholder:text-white/50 min-h-24 resize-none"
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
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-medium"
          >
            {isSubmitting ? "Creating..." : "Create Anonymous Question"}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </Card>
  );
}