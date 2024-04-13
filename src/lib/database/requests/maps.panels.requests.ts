import {db} from "../index";
import {eq} from "drizzle-orm";
import {mapsPanels} from "../schemas/maps.panels";

export async function getAllMapsPanels() {
    return db.select().from(mapsPanels);
}

export async function getMapsPanelById(id: number) {
    return db.select().from(mapsPanels).where(eq(mapsPanels.id, id))
}

export async function createMapsPanel() {
    return db.insert(mapsPanels).values({}).returning();
}

export async function deleteMapsPanel(id: number) {
    return db.delete(mapsPanels).where(eq(mapsPanels.id, id))
}
