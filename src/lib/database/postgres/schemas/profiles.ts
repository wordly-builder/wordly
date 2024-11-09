import {integer, pgTable, serial, text} from "drizzle-orm/pg-core";
import type {InferSelectModel, InferInsertModel} from "drizzle-orm";

export const profiles = pgTable("profile", {
    id: serial("id").notNull().primaryKey(),
    googleId: text("googleId"),
    name: text("name"),
    email: text("email"),
    image: text("image"),
    createdAt: text("createdAt"),
});

export type ProfileSelect = InferSelectModel<typeof profiles>;
export type ProfileInsert = InferInsertModel<typeof profiles>;
