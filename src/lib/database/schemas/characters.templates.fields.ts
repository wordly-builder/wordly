import {pgTable, serial, text} from "drizzle-orm/pg-core";
import {charactersTemplates} from "./characters.templates";

export const charactersTemplatesFields = pgTable("characters_templates_field", {
    id: serial("id").notNull().primaryKey(),
    templateId: serial("template_id").notNull().references(() => charactersTemplates.id),
    name: text("name").notNull().default(""),
    type: text("type").notNull().default("text"),
    columns: text("columns").notNull().default("1"),
    rows: text("rows").notNull().default("1"),
});
