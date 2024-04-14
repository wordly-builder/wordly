import {integer, pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {mapsPanels} from "./maps.panels";

export const maps = pgTable("map", {
    id: serial("id").notNull().primaryKey(),
    name: text("name"),
    panelId: integer("panel_id").notNull().references(() => mapsPanels.id),
});

export const mapsMapsPanelsRelations = relations(maps, ({one}) => ({
    panel: one(mapsPanels, {
        fields: [maps.panelId],
        references: [mapsPanels.id],
    }),
}));
