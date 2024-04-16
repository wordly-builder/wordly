import {pgTable, serial, text} from "drizzle-orm/pg-core";
import {characters} from "./characters";

export const charactersFields = pgTable("character_fields", {
    id: serial("id").notNull().primaryKey(),
    characterId: serial("character_id").notNull().references(() => characters.id),
    data: text("data").notNull(),
});
