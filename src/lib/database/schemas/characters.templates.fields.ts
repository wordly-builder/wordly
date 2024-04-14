import {integer, pgTable, serial, text} from "drizzle-orm/pg-core";
import {charactersTemplates} from "./characters.templates";

export const charactersTemplatesFields = pgTable("characters_templates_field", {
    id: serial("id").notNull().primaryKey(),
    templateId: serial("template_id").notNull().references(() => charactersTemplates.id),
    name: text("name").notNull().default(""),
    type: text("type").notNull().default("text"),
    column: integer("column").notNull().default(1),
    row: integer("row").notNull().default(1),
    columnSize: integer("column_size").notNull().default(1),
    rowSize: integer("row_size").notNull().default(1),
});

export type CharactersTemplatesFieldsSelect = typeof charactersTemplatesFields.$inferSelect
export type CharactersTemplatesFieldsInsert = typeof charactersTemplatesFields.$inferInsert
