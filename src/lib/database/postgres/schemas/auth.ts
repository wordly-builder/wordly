import {pgTable, serial, text, integer, timestamp, boolean} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";

export const userTable = pgTable("users", {
    id: serial("id").primaryKey(),
    googleId: text("google_id"),
    githubId: text("github_id"),
    name: text("name").notNull(),
    email: text("email").notNull(),
    isEmailVerified: boolean("is_email_verified").notNull(),
    passwordHash: text("password_hash"),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).notNull(),
    profilePictureUrl: text("profile_picture_url")
});

export const sessionTable = pgTable("sessions", {
    id: text("id").primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});

export type User = InferSelectModel<typeof userTable>;
export type UserInsert = Omit<User, "id">;
export type Session = InferSelectModel<typeof sessionTable>;
export type SessionInsert = Omit<Session, "id">;