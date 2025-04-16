import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We'll keep the users table for compatibility, but we won't use it
// as we're using Firebase for authentication and storage
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Zod schemas for Firebase data types
export const questionSchema = z.object({
  id: z.string(),
  text: z.string(),
  username: z.string(),
  avatarUrl: z.string().nullable(),
  userId: z.string(),
  createdAt: z.any(), // Firebase Timestamp
  repliesCount: z.number().default(0),
});

export const replySchema = z.object({
  id: z.string(),
  questionId: z.string(),
  text: z.string(),
  username: z.string(),
  avatarUrl: z.string().nullable(),
  userId: z.string(),
  createdAt: z.any(), // Firebase Timestamp
});

export const createQuestionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  username: z.string().min(1, "Username is required"),
  avatarUrl: z.string().nullable().optional(),
});

export const createReplySchema = z.object({
  text: z.string().min(1, "Reply text is required"),
  username: z.string().min(1, "Username is required"),
  avatarUrl: z.string().nullable().optional(),
});

export type Question = z.infer<typeof questionSchema>;
export type Reply = z.infer<typeof replySchema>;
export type CreateQuestion = z.infer<typeof createQuestionSchema>;
export type CreateReply = z.infer<typeof createReplySchema>;
