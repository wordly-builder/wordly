import {integer, pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations, sql} from "drizzle-orm";
import {maps} from "./maps";

export const mapsPanels = pgTable("maps_panel", {
    id: serial("id").primaryKey(),

});

export const mapsPanelsMapsRelations = relations(mapsPanels, ({many}) => ({
    maps: many(maps),
}));
