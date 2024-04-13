import {db} from "../index";
import {eq} from "drizzle-orm";
import {maps} from "../schemas/maps";

export async function getAllMaps() {
    return db.select().from(maps);
}

export async function getMapById(id: number) {
    return db.select().from(maps).where(eq(maps.id, id))
}

export async function getMapsByPanel(panelId: number) {
    return db.select().from(maps).where(eq(maps.panelId, panelId))
}

export async function createMap({name, panelId}: {name: string, panelId: number }) {
    return db.insert(maps).values({name, panelId }).returning();
}

export async function updateMap(id: number, {name, panelId}: {name: string, panelId: number }) {
    return db.update(maps).set({name, panelId}).where(eq(maps.id, id))
}

export async function deleteMap(id: number) {
    return db.delete(maps).where(eq(maps.id, id))
}
