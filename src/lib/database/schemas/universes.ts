import {pgTable, serial, text} from "drizzle-orm/pg-core";
import {accounts} from "./auth";
import {profiles} from "./profiles";
import {charactersPanels} from "./characters.panels";
import {mapsPanels} from "./maps.panels";
import {sql} from "drizzle-orm";

export const universes = pgTable("universe", {
    id: serial("id").notNull().primaryKey(),
    name: text("name"),
    owners: serial("owner").notNull().references(() => profiles.id),
    charactersPanel: serial("characters_panel").references(() => charactersPanels.id),
    mapsPanel: serial("maps_panel").references(() => mapsPanels.id),
});
