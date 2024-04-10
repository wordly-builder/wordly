import {pgTable, serial, text} from "drizzle-orm/pg-core";
import {accounts} from "./auth";
import {profiles} from "./profiles";

export const universes = pgTable("universe", {
    id: serial("id").notNull().primaryKey(),
    name: text("name"),
    owners: serial("owner").notNull().references(() => profiles.id),
});
