import {integer, pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {charactersPanels} from "./characters.panels";

export const characters = pgTable("character", {
    id: serial("id").notNull().primaryKey(),
    name: text("name"),
    panelId: integer("panel_id").notNull(),
});

export const charactersCharactersPanelsRelations = relations(characters, ({one}) => ({
    panel: one(charactersPanels, {
        fields: [characters.panelId],
        references: [charactersPanels.id],
    }),
}));
