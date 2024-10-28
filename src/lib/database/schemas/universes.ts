import {integer, pgTable, serial, text} from "drizzle-orm/pg-core";
import {accounts} from "./auth";
import {profiles} from "./profiles";
import {charactersPanels} from "./characters.panels";
import {mapsPanels} from "./maps.panels";
import {sql} from "drizzle-orm";

export const universes = pgTable("universe", {
    id: serial("id").notNull().primaryKey(),
    name: text("name"),
    owners: serial("owner").notNull().references(() => profiles.id),
    charactersPanel: integer("characters_panel").references(() => charactersPanels.id).default(sql`NULL`),
    mapsPanel: integer("maps_panel").references(() => mapsPanels.id).default(sql`NULL`)
});
