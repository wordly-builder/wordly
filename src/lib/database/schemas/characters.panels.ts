import {integer, pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {characters} from "./characters";

export const charactersPanels = pgTable("characters_panel", {
    id: serial("id").notNull().primaryKey(),
});

export const charactersPanelsCharactersRelations = relations(charactersPanels, ({many}) => ({
   characters: many(characters),
}));
