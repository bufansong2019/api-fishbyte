import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	username: text("username").notNull().unique(),
	passwordHash: text("password_hash").notNull(),
	passwordSalt: text("password_salt").notNull(),
	role: text("role").notNull().default("user"),
	createdAt: text("created_at").notNull().default("datetime('now')"),
});

export const apiKeys = sqliteTable("api_keys", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	key: text("key").notNull().unique(),
	name: text("name").notNull(),
	enabled: integer("enabled").notNull().default(1),
	createdAt: text("created_at").notNull().default("datetime('now')"),
});

export const activityLogs = sqliteTable("activity_logs", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	user: text("user").notNull(),
	action: text("action").notNull(),
	status: text("status").notNull().default("成功"),
	createdAt: text("created_at").notNull().default("datetime('now')"),
});
