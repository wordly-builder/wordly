import {pgTable, serial} from "drizzle-orm/pg-core";
import {text} from "drizzle-orm/pg-core";
import {charactersPanels} from "./characters.panels";

export const charactersTemplates = pgTable("characters_template", {
    id: serial("id").notNull().primaryKey(),
    panelId: serial("panel_id").notNull().references(() => charactersPanels.id), // (1
    name: text("name").notNull(),
});
