import {integer, pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {maps} from "./maps";

export const mapsPanels = pgTable("maps_panel", {
    id: serial("id").notNull().primaryKey(),

});

export const mapsPanelsMapsRelations = relations(mapsPanels, ({many}) => ({
    maps: many(maps),
}));
