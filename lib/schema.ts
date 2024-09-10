import { integer, text, boolean, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(), // Auto-incrementing user ID
  username: text("username").notNull(), // Username field for user
  password: text("password").notNull(), // Hashed password field
  pic: text("pic"), // Hashed password field
});

// Images table (linked to the users table)
export const images = pgTable("images", {
  id: serial("id").primaryKey(), // Auto-incrementing image ID
  userId: integer("user_id").references(() => users.id).notNull(), // Foreign key to the users table
  beforeBgRemoval: text("before_bg_removal").notNull(), // Stores the original image URL or path
  afterBgRemoval: text("after_bg_removal").notNull(), // Stores the image after background removal URL or path
  processedAt: timestamp("processed_at") // Status of the background removal process
});
