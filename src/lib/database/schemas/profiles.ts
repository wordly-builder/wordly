import {integer, pgTable, serial, text} from "drizzle-orm/pg-core";

export const profiles = pgTable("profile", {
    id: serial("id").notNull().primaryKey(),
    googleId: text("googleId"),
    name: text("name"),
    email: text("email"),
    image: text("image"),
    createdAt: text("createdAt"),
});
