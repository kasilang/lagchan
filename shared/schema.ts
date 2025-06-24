import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const boards = pgTable("boards", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
});

export const threads = pgTable("threads", {
  id: serial("id").primaryKey(),
  boardId: integer("board_id").notNull(),
  subject: text("subject"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastBumpAt: timestamp("last_bump_at").defaultNow().notNull(),
  isSticky: boolean("is_sticky").default(false),
  isLocked: boolean("is_locked").default(false),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  threadId: integer("thread_id").notNull(),
  boardId: integer("board_id").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  imageName: text("image_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBoardSchema = createInsertSchema(boards).omit({
  id: true,
});

export const insertThreadSchema = createInsertSchema(threads).omit({
  id: true,
  createdAt: true,
  lastBumpAt: true,
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
});

export type InsertBoard = z.infer<typeof insertBoardSchema>;
export type Board = typeof boards.$inferSelect;
export type InsertThread = z.infer<typeof insertThreadSchema>;
export type Thread = typeof threads.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;

export type ThreadWithPosts = Thread & {
  posts: Post[];
  postCount: number;
};

export type BoardWithStats = Board & {
  threadCount: number;
  postCount: number;
  lastPost?: Post;
};
