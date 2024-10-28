import {integer, pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations, sql} from "drizzle-orm";
import {characters} from "./characters";

export const charactersPanels = pgTable("characters_panel", {
    id: serial("id").primaryKey(),
});

export const charactersPanelsCharactersRelations = relations(charactersPanels, ({many}) => ({
   characters: many(characters),
}));
