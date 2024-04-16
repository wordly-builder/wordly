import {integer, pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {charactersPanels} from "./characters.panels";
import {charactersTemplates} from "./characters.templates";

export const characters = pgTable("character", {
    id: serial("id").notNull().primaryKey(),
    panelId: integer("panel_id").notNull().references(() => charactersPanels.id),
    templateId: serial("template_id").notNull().references(() => charactersTemplates.id),
});

export const charactersCharactersPanelsRelations = relations(characters, ({one}) => ({
    panel: one(charactersPanels, {
        fields: [characters.panelId],
        references: [charactersPanels.id],
    }),
}));
